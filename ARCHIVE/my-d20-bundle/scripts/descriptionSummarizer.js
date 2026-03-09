/**
 * descriptionSummarizer.js
 * ------------------------
 * Normalizes feat descriptions and benefit text into a canonical 3.5E format.
 *
 * Output:
 * {
 *   description: "Clean summary text",
 *   normalizedBenefit: "Normalized benefit text",
 *   mechanicsHash: "sha256:..."
 * }
 */

const crypto = require("crypto");

/**
 * Normalize whitespace, remove double spaces, trim punctuation.
 */
function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:])/g, "$1")
    .trim();
}

/**
 * Remove boilerplate text from SRD/3PP sources.
 */
function stripBoilerplate(text) {
  if (!text) return "";

  const boilerplatePatterns = [
    /this is a supernatural ability\./i,
    /this is an extraordinary ability\./i,
    /this is a spell-like ability\./i,
    /see page \d+/i,
    /see the .* section/i,
    /as described in the .* chapter/i
  ];

  let result = text;
  for (const pattern of boilerplatePatterns) {
    result = result.replace(pattern, "");
  }

  return result.trim();
}

/**
 * Combine benefit + special + normal into a single canonical description.
 */
function buildDescription(sections) {
  const parts = [];

  if (sections.benefit) parts.push(sections.benefit);
  if (sections.special) parts.push(`Special: ${sections.special}`);
  if (sections.normal) parts.push(`Normal: ${sections.normal}`);

  return cleanText(stripBoilerplate(parts.join(" ")));
}

/**
 * Create a stable hash for dedupe engine.
 */
function createMechanicsHash(text) {
  const hash = crypto.createHash("sha256");
  hash.update(text.toLowerCase().trim());
  return "sha256:" + hash.digest("hex");
}

/**
 * Main entry point.
 */
function summarizeDescription(sections) {
  const benefit = cleanText(stripBoilerplate(sections.benefit || ""));
  const description = buildDescription(sections);

  const mechanicsHash = createMechanicsHash(description);

  return {
    description,
    normalizedBenefit: benefit,
    mechanicsHash
  };
}

module.exports = {
  summarizeDescription
};
