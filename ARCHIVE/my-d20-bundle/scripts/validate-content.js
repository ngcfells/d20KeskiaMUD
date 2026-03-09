/**
 * validate-content.js
 * -------------------
 * Ensures all feat files and canonical maps follow the final schema.
 */

const fs = require("fs");
const path = require("path");

const canonicalNames = require("./canonicalFeatNames");
const canonicalCategories = require("./canonicalFeatCategories");
const canonicalPrereqs = require("./canonicalFeatPrerequisites");

function isSha256Hash(str) {
  return /^sha256:[a-f0-9]{64}$/i.test(str);
}

function validatePrerequisites(pr) {
  if (typeof pr !== "object" || pr === null) return false;

  const requiredKeys = [
    "baseAttackBonus",
    "attributes",
    "skills",
    "feats",
    "classFeatures",
    "race",
    "alignment"
  ];

  for (const key of requiredKeys) {
    if (!(key in pr)) return false;
  }

  return true;
}

function validateFeatFile(filePath) {
  const feat = require(filePath);
  const errors = [];

  if (!feat.id) errors.push("Missing id");
  if (!feat.name) errors.push("Missing name");
  if (!feat.category) errors.push("Missing category");

  if (!feat.description || typeof feat.description !== "string") {
    errors.push("Missing or invalid description");
  }

  if (!feat.mechanicsHash || !isSha256Hash(feat.mechanicsHash)) {
    errors.push("Missing or invalid mechanicsHash");
  }

  if (!feat.normalizedBenefit || typeof feat.normalizedBenefit !== "string") {
    errors.push("Missing or invalid normalizedBenefit");
  }

  if (!validatePrerequisites(feat.prerequisites)) {
    errors.push("Invalid prerequisites schema");
  }

  return errors;
}

function validateCanonicalMaps() {
  const errors = [];

  for (const [id, header] of Object.entries(canonicalNames)) {
    if (!header.canonicalName) errors.push(`Missing canonicalName for ${id}`);
    if (!header.primarySource) errors.push(`Missing primarySource for ${id}`);
    if (!header.mechanicsHash) errors.push(`Missing mechanicsHash for ${id}`);
    if (!isSha256Hash(header.mechanicsHash)) {
      errors.push(`Invalid mechanicsHash for ${id}`);
    }
    if (!header.normalizedBenefit) {
      errors.push(`Missing normalizedBenefit for ${id}`);
    }
  }

  for (const [id, prereqs] of Object.entries(canonicalPrereqs)) {
    if (!validatePrerequisites(prereqs)) {
      errors.push(`Invalid prerequisites schema for ${id}`);
    }
  }

  return errors;
}

function validateCanonicalCategories() {
  const errors = [];
  for (const [id, category] of Object.entries(canonicalCategories)) {
    if (!category || typeof category !== "string") {
      errors.push(`Invalid or missing category for ${id}`);
    }
  }
  return errors;
}

function runValidation() {
  const errors = [];

  // Validate feat files
  const featsDir = path.join(__dirname, "..", "bundles", "d20-feats");
  const categories = fs.readdirSync(featsDir);

  for (const cat of categories) {
    const catDir = path.join(featsDir, cat);
    if (!fs.statSync(catDir).isDirectory()) continue;

    const letters = fs.readdirSync(catDir);
    for (const letter of letters) {
      const letterDir = path.join(catDir, letter);
      if (!fs.statSync(letterDir).isDirectory()) continue;

      const files = fs.readdirSync(letterDir);
      for (const file of files) {
        if (!file.endsWith(".js")) continue;

        const filePath = path.join(letterDir, file);
        const fileErrors = validateFeatFile(filePath);

        if (fileErrors.length > 0) {
          errors.push(`Errors in ${filePath}: ${fileErrors.join(", ")}`);
        }
      }
    }
  }

  // Validate canonical maps
  errors.push(...validateCanonicalMaps());
  errors.push(...validateCanonicalCategories());

  if (errors.length === 0) {
    console.log("All feats validated successfully.");
  } else {
    console.error("Validation errors:");
    for (const err of errors) console.error(" - " + err);
  }
}

module.exports = {
  runValidation
};
