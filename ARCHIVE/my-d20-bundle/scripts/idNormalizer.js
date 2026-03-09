/**
 * idNormalizer.js
 * ----------------
 * Ensures every incoming feat receives a valid canonical ID.
 *
 * Rules:
 *   - Lowercase
 *   - Snake_case
 *   - Remove parentheses
 *   - Remove punctuation
 *   - Collapse whitespace
 *   - Remove leading/trailing underscores
 *
 * This is the same logic used by the dedupe engine, but extracted
 * into its own module so the ingestion pipeline can call it directly.
 */

function stripIdPrefixes(id) {
  return id
    .replace(/^pfs_legal_/, "")
    .replace(/^pfs_/, "")
    .replace(/^3_5_material/, "")
    .replace(/^3_5_/, "")
    .replace(/^3\.5_/, "")
    .replace(/^3\.5/, "")
    .trim();
}

function normalizeId(name) {
  if (!name) return "";

  let id = name.toLowerCase();

  id = stripIdPrefixes(id);

  id = id
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/__+/g, "_");

  return id;
}

module.exports = {
  normalizeId
};
