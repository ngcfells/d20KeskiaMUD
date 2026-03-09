/**
 * dedupeFeatDefinition.js
 * -----------------------
 * Compares an existing canonical feat with an incoming feat definition
 * and decides:
 *
 *  - "same"     → same mechanics, merge sources
 *  - "variant"  → related name/theme, different mechanics
 *  - "different"→ unrelated feat, treat as new canonical
 */

const crypto = require("crypto");

function normalizeWhitespace(text) {
  if (!text) return "";
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

function hashText(text) {
  const h = crypto.createHash("sha256");
  h.update(normalizeWhitespace(text));
  return h.digest("hex");
}

/**
 * Shallow structural comparison of prerequisites.
 * We assume both are in the canonical schema:
 * {
 *   baseAttackBonus,
 *   attributes,
 *   skills,
 *   feats,
 *   classFeatures,
 *   race,
 *   alignment
 * }
 */
function samePrerequisites(a, b) {
  return JSON.stringify(a || {}) === JSON.stringify(b || {});
}

/**
 * Decide if two feats are "same", "variant", or "different".
 *
 * canonicalFeat: {
 *   id,
 *   name,
 *   category,
 *   prerequisites,
 *   header,
 *   mechanicsHash,
 *   normalizedBenefit
 * }
 *
 * incomingFeat: {
 *   id,
 *   name,
 *   category,
 *   prerequisites,
 *   description,
 *   mechanicsHash,
 *   normalizedBenefit,
 *   source
 * }
 */
function dedupeFeatDefinition(canonicalFeat, incomingFeat) {
  const canonicalHash = canonicalFeat.mechanicsHash || hashText(canonicalFeat.normalizedBenefit || "");
  const incomingHash = incomingFeat.mechanicsHash || hashText(incomingFeat.normalizedBenefit || "");

  // 1) Strongest signal: identical mechanicsHash
  if (canonicalHash === incomingHash) {
    return {
      relation: "same",
      mergedHeader: mergeHeaders(canonicalFeat.header, incomingFeat)
    };
  }

  // 2) Next: normalizedBenefit text identical
  if (
    normalizeWhitespace(canonicalFeat.normalizedBenefit) ===
    normalizeWhitespace(incomingFeat.normalizedBenefit)
  ) {
    return {
      relation: "same",
      mergedHeader: mergeHeaders(canonicalFeat.header, incomingFeat)
    };
  }

  // 3) Same name + category + very similar prerequisites → likely variant
  const sameName =
    normalizeWhitespace(canonicalFeat.name) ===
    normalizeWhitespace(incomingFeat.name);

  const sameCategory =
    normalizeWhitespace(canonicalFeat.category) ===
    normalizeWhitespace(incomingFeat.category);

  const prereqMatch = samePrerequisites(
    canonicalFeat.prerequisites,
    incomingFeat.prerequisites
  );

  if (sameName && sameCategory && !prereqMatch) {
    return {
      relation: "variant",
      suggestedVariantId: suggestVariantId(canonicalFeat.id, incomingFeat)
    };
  }

  // 4) Fallback: different mechanics, treat as different feat
  return {
    relation: "different"
  };
}

/**
 * Merge header/source info when feats are determined to be the same.
 */
function mergeHeaders(canonicalHeader, incomingFeat) {
  const merged = { ...canonicalHeader };

  const incomingSource = {
    book: incomingFeat.source.book,
    publisher: incomingFeat.source.publisher
  };

  // If primarySource matches, do nothing special
  const primaryMatches =
    merged.primarySource &&
    merged.primarySource.book === incomingSource.book &&
    merged.primarySource.publisher === incomingSource.publisher;

  if (!primaryMatches) {
    const alreadyInAdditional = (merged.additionalSources || []).some(
      src =>
        src.book === incomingSource.book &&
        src.publisher === incomingSource.publisher
    );

    if (!alreadyInAdditional) {
      merged.additionalSources = merged.additionalSources || [];
      merged.additionalSources.push(incomingSource);
    }
  }

  return merged;
}

/**
 * Suggest a variant ID based on canonical ID + a hash of incoming mechanics.
 */
function suggestVariantId(canonicalId, incomingFeat) {
  const base = `${canonicalId}_${incomingFeat.source.book || "variant"}`;
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

module.exports = {
  dedupeFeatDefinition
};
