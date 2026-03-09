"use strict";

const { toSnakeCase } = require("./idNormalizer");

const CATEGORY_KEYWORDS = [
  "item creation feats",
  "metamagic feats",
  "general feats",
  "fighter bonus feats",
  "psionic feats",
  "divine feats",
  "epic feats",
  "teamwork feats",
  "heritage feats",
  "racial feats",
  "armor proficiency"
];

// Rejects category headers
function isCategoryHeader(name) {
  const lower = name.toLowerCase().trim();
  return CATEGORY_KEYWORDS.some(k => lower.startsWith(k));
}

// Splits multi-feat headers like:
// "Armor Proficiency (light, medium, heavy)"
function splitMultiFeatHeader(name) {
  const match = name.match(/^(.*?)\s*\((.*?)\)$/);
  if (!match) return [name];

  const base = match[1].trim();          // "Armor Proficiency"
  const variants = match[2].split(",");  // ["light", "medium", "heavy"]

  return variants.map(v => `${base} ${v.trim()}`);
}

// Validates a single feat name
function isLikelyFeatName(name) {
  if (!name) return false;

  const lower = name.toLowerCase().trim();

  if (isCategoryHeader(lower)) return false;
  if (lower.includes("feats")) return false;
  if (lower.endsWith("feats")) return false;

  // Reject long section headings
  if (lower.split(/\s+/).length > 4) return false;

  // Must start with a capital letter
  if (!/^[A-Z]/.test(name.trim())) return false;

  return true;
}

// Main sanitizer
function sanitizeFeatNames(rawNames) {
  const results = [];

  for (const raw of rawNames) {
    if (!raw) continue;

    // Split multi-feat headers
    const split = splitMultiFeatHeader(raw);

    for (const name of split) {
      if (!isLikelyFeatName(name)) continue;

      results.push({
        name: name.trim(),
        id: toSnakeCase(name)
      });
    }
  }

  return results;
}

module.exports = { sanitizeFeatNames };
