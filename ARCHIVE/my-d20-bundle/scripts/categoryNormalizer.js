/**
 * categoryNormalizer.js
 * ---------------------
 * Ensures every incoming feat is assigned a valid canonical category.
 *
 * Categories (Model‑2):
 *   - general
 *   - combat
 *   - craft
 *   - magic
 *   - movement
 *   - other
 *
 * This module:
 *   - Normalizes category strings from any SRD
 *   - Falls back to heuristics if category is missing
 *   - Guarantees a valid category is returned
 */

const VALID_CATEGORIES = new Set([
  "general",
  "combat",
  "craft",
  "magic",
  "movement",
  "other"
]);

/**
 * Normalize category string from any SRD.
 */
function normalizeCategory(rawCategory, incomingFeat) {
  if (rawCategory && VALID_CATEGORIES.has(rawCategory)) {
    return rawCategory;
  }

  const lower = (rawCategory || "").toLowerCase().trim();

  // Direct matches
  if (VALID_CATEGORIES.has(lower)) return lower;

  // Heuristics based on feat name
  const name = incomingFeat.name.toLowerCase();

  if (name.includes("spell") || name.includes("metamagic")) {
    return "magic";
  }

  if (
    name.includes("weapon") ||
    name.includes("shot") ||
    name.includes("mounted") ||
    name.includes("shield") ||
    name.includes("armor") ||
    name.includes("combat")
  ) {
    return "combat";
  }

  if (name.includes("craft")) {
    return "craft";
  }

  if (name.includes("run") || name.includes("track")) {
    return "movement";
  }

  // Default fallback
  return "general";
}

module.exports = {
  normalizeCategory,
  VALID_CATEGORIES
};
