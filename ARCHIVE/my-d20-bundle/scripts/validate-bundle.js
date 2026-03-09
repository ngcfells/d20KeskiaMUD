/**
 * validate-bundle.js
 * ------------------
 * Top-level validator for the entire d20-feats bundle.
 *
 * Responsibilities:
 *  - Load canonical maps
 *  - Walk the feat directory structure
 *  - Validate each feat file against canonical maps
 *  - Ensure no drift between:
 *      - canonicalFeatNames.js
 *      - canonicalFeatCategories.js
 *      - canonicalFeatPrerequisites.js
 *      - actual feat files
 *  - Ensure variants exist and point to valid parents
 *  - Ensure no orphan files exist
 */

const fs = require("fs");
const path = require("path");
const { validateFeatFile } = require("./validate-content");

const canonicalNames = require("./canonicalFeatNames");
const canonicalCategories = require("./canonicalFeatCategories");
const canonicalPrereqs = require("./canonicalFeatPrerequisites");

const FEAT_ROOT = path.join(__dirname, "..", "bundles", "d20-feats");

function walkFeatFiles() {
  const results = [];

  const categories = fs.readdirSync(FEAT_ROOT);
  for (const category of categories) {
    const categoryDir = path.join(FEAT_ROOT, category);
    if (!fs.statSync(categoryDir).isDirectory()) continue;

    const letters = fs.readdirSync(categoryDir);
    for (const letter of letters) {
      const letterDir = path.join(categoryDir, letter);
      if (!fs.statSync(letterDir).isDirectory()) continue;

      const files = fs.readdirSync(letterDir);
      for (const file of files) {
        if (!file.endsWith(".js")) continue;
        const fullPath = path.join(letterDir, file);
        results.push(fullPath);
      }
    }
  }

  return results;
}

function validateBundle() {
  const errors = [];
  const warnings = [];

  const featFiles = walkFeatFiles();

  //
  // 1. Validate each feat file
  //
  for (const filePath of featFiles) {
    const result = validateFeatFile(filePath, {
      canonicalNames,
      canonicalCategories,
      canonicalPrereqs
    });

    if (result.errors.length > 0) {
      errors.push({ file: filePath, errors: result.errors });
    }
    if (result.warnings.length > 0) {
      warnings.push({ file: filePath, warnings: result.warnings });
    }
  }

  //
  // 2. Ensure every canonical ID has a file
  //
  for (const canonicalId of Object.keys(canonicalNames)) {
    const category = canonicalCategories[canonicalId];
    const letter = canonicalId[0];
    const expectedPath = path.join(
      FEAT_ROOT,
      category,
      letter,
      `${canonicalId}.js`
    );

    if (!fs.existsSync(expectedPath)) {
      errors.push({
        file: expectedPath,
        errors: [`Missing feat file for canonical ID: ${canonicalId}`]
      });
    }
  }

  //
  // 3. Ensure no orphan files exist
  //
  for (const filePath of featFiles) {
    const id = path.basename(filePath, ".js");
    if (!canonicalNames[id]) {
      errors.push({
        file: filePath,
        errors: [`Orphan feat file: no canonical entry for ID "${id}"`]
      });
    }
  }

  //
  // 4. Ensure variants point to valid parents
  //
  for (const canonicalId of Object.keys(canonicalNames)) {
    const variants = canonicalNames[canonicalId].variants || [];
    for (const variantId of variants) {
      if (!canonicalNames[variantId]) {
        errors.push({
          file: canonicalId,
          errors: [`Variant "${variantId}" does not exist as a canonical entry`]
        });
      }
    }
  }

  return { errors, warnings };
}

module.exports = { validateBundle };
