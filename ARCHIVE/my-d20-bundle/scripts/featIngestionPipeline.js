/**
 * featIngestionPipeline.js
 * ------------------------
 * Central ingestion orchestrator for adding feats from any SRD/OGL source.
 *
 * Step‑C is now format‑agnostic:
 * - Accepts JSON, TSV, CSV, HTML, raw text, etc.
 * - Normalizes into a canonical feat object
 * - Then runs the existing canonical/variant/dedupe logic
 */

"use strict";

const fs = require("fs");
const path = require("path");

const { normalizeFeatInput } = require("./featInputNormalizer");

const { dedupeFeatDefinition } = require("./dedupeFeatDefinition");
const { normalizeCategory } = require("./categoryNormalizer");
const { normalizeId } = require("./idNormalizer");

const { parseFeatText } = require("./featSectionDetector");
const { extractPrerequisites } = require("./prerequisiteExtractor");
const { summarizeDescription } = require("./descriptionSummarizer");

// Canonical maps
const canonicalNames = require("./canonicalFeatNames");
const canonicalCategories = require("./canonicalFeatCategories");
const canonicalPrereqs = require("./canonicalFeatPrerequisites");

/**
 * Atomic safe write helper to avoid Windows file lock issues.
 */
function safeWrite(filePath, data) {
  const tmp = filePath + ".tmp";
  fs.writeFileSync(tmp, data);

  const maxRetries = 10;
  const delayMs = 25;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Try to remove the existing file first (in case it's in a weird state)
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          // If unlink fails due to lock, we'll hit it again on next retry
        }
      }

      fs.renameSync(tmp, filePath);
      return; // success
    } catch (err) {
      if (attempt === maxRetries) {
        // Give up after max retries and surface the error
        throw err;
      }
      // Brief pause before retrying
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delayMs);
    }
  }
}


/**
 * Main ingestion entry point.
 *
 * rawInput: ANY format:
 *   - structured feat object (JSON/TSV/CSV normalized)
 *   - raw SRD text
 *   - HTML
 *   - etc.
 *
 * sourceInfo: optional { book, publisher, system, ... } to override/augment source.
 */
function ingestFeat(rawInput, sourceInfo) {
  // Normalize ANY input into a canonical feat-like object
  const normalized = normalizeFeatInput(rawInput);

  // Allow explicit source override
  if (sourceInfo) {
    normalized.source = {
      ...(normalized.source || {}),
      ...sourceInfo
    };
  }

  // Convert normalized input into full ingestion shape
  const incoming = processRawFeatBlock(normalized, normalized.source);
  const incomingId = incoming.id;

  // Check if canonical feat exists
  const canonicalId = Object.keys(canonicalNames).find(
    id => normalizeId(id) === incomingId
  );

  if (!canonicalId) {
    //
    // NEW FEAT — add to canonical maps
    //
    canonicalNames[incomingId] = {
      canonicalName: incoming.name,
      alternateNames: {},
      variants: [],
      primarySource: {
        book: incoming.source.book,
        publisher: incoming.source.publisher
      },
      additionalSources: [],
      mechanicsHash: incoming.mechanicsHash,
      normalizedBenefit: incoming.normalizedBenefit
    };

    canonicalCategories[incomingId] = incoming.category;
    canonicalPrereqs[incomingId] = incoming.prerequisites;

    writeCanonicalMaps();

    writeFeatFile(incomingId, {
      id: incomingId,
      name: incoming.name,
      category: incoming.category,
      prerequisites: incoming.prerequisites,
      description: incoming.description,
      mechanicsHash: incoming.mechanicsHash,
      normalizedBenefit: incoming.normalizedBenefit,
      header: canonicalNames[incomingId]
    });

    return {
      status: "new",
      id: incomingId,
      message: `Created new canonical feat: ${incoming.name}`
    };
  }

  //
  // EXISTING FEAT — dedupe
  //
  const canonicalFeat = {
    id: canonicalId,
    name: canonicalNames[canonicalId].canonicalName,
    category: canonicalCategories[canonicalId],
    prerequisites: canonicalPrereqs[canonicalId],
    header: canonicalNames[canonicalId],
    mechanicsHash: canonicalNames[canonicalId].mechanicsHash,
    normalizedBenefit: canonicalNames[canonicalId].normalizedBenefit
  };

  const result = dedupeFeatDefinition(canonicalFeat, incoming);

  if (result.relation === "same") {
    canonicalNames[canonicalId] = {
      ...canonicalNames[canonicalId],
      ...result.mergedHeader,
      mechanicsHash: incoming.mechanicsHash,
      normalizedBenefit: incoming.normalizedBenefit
    };

    writeCanonicalMaps();

    return {
      status: "merged",
      id: canonicalId,
      message: `Merged additional source into canonical feat: ${canonicalId}`
    };
  }

  if (result.relation === "variant") {
    //
    // VARIANT FEAT — create new variant ID
    //
    const variantId = result.suggestedVariantId;

    canonicalNames[canonicalId].variants.push(variantId);

    canonicalNames[variantId] = {
      canonicalName: incoming.name,
      alternateNames: {},
      variants: [],
      primarySource: {
        book: incoming.source.book,
        publisher: incoming.source.publisher
      },
      additionalSources: [],
      mechanicsHash: incoming.mechanicsHash,
      normalizedBenefit: incoming.normalizedBenefit
    };

    canonicalCategories[variantId] = incoming.category;
    canonicalPrereqs[variantId] = incoming.prerequisites;

    writeCanonicalMaps();

    writeFeatFile(variantId, {
      id: variantId,
      name: incoming.name,
      category: incoming.category,
      prerequisites: incoming.prerequisites,
      description: incoming.description,
      mechanicsHash: incoming.mechanicsHash,
      normalizedBenefit: incoming.normalizedBenefit,
      header: canonicalNames[variantId]
    });

    return {
      status: "variant",
      id: variantId,
      message: `Created variant feat: ${variantId}`
    };
  }

  //
  // DIFFERENT FEAT — treat as new canonical feat
  //
  canonicalNames[incomingId] = {
    canonicalName: incoming.name,
    alternateNames: {},
    variants: [],
    primarySource: {
      book: incoming.source.book,
      publisher: incoming.source.publisher
    },
    additionalSources: [],
    mechanicsHash: incoming.mechanicsHash,
    normalizedBenefit: incoming.normalizedBenefit
  };

  canonicalCategories[incomingId] = incoming.category;
  canonicalPrereqs[incomingId] = incoming.prerequisites;

  writeCanonicalMaps();

  writeFeatFile(incomingId, {
    id: incomingId,
    name: incoming.name,
    category: incoming.category,
    prerequisites: incoming.prerequisites,
    description: incoming.description,
    mechanicsHash: incoming.mechanicsHash,
    normalizedBenefit: incoming.normalizedBenefit,
    header: canonicalNames[incomingId]
  });

  return {
    status: "new",
    id: incomingId,
    message: `Created new canonical feat (distinct mechanics): ${incoming.name}`
  };
}

/**
 * Convert normalized input into the internal ingestion shape.
 *
 * raw can be:
 *  - structured feat object (from normalizeFeatInput)
 *  - raw SRD text (string)
 */
function processRawFeatBlock(raw, sourceInfo) {
  // CASE 1: Structured feat object (JSON/TSV/CSV/etc.)
  if (typeof raw === "object" && raw !== null && raw.name) {
    const id = normalizeId(raw.name);

    const prereqText =
      raw.prerequisitesRaw ||
      raw.prerequisites ||
      (raw.sections && raw.sections.prerequisites) ||
      "";

    const descText =
      raw.descriptionRaw ||
      raw.description ||
      (raw.sections && raw.sections.description) ||
      "";

    const prerequisites = extractPrerequisites(prereqText);

    let summary;
    if (raw.sections) {
      summary = summarizeDescription(raw.sections);
    } else {
      summary = {
        description: descText,
        mechanicsHash: "",
        normalizedBenefit: descText
      };
    }

    return {
      id,
      name: raw.name,
      category: normalizeCategory(raw.typeTag || null, raw),
      prerequisites,
      description: summary.description,
      mechanicsHash: summary.mechanicsHash,
      normalizedBenefit: summary.normalizedBenefit,
      source: sourceInfo
    };
  }

  // CASE 2: Raw SRD text (string) — old Step‑C path
  const parsed = parseFeatText(raw);

  const prerequisites = extractPrerequisites(parsed.sections.prerequisites);
  const summary = summarizeDescription(parsed.sections);
  const id = normalizeId(parsed.name);

  return {
    id,
    name: parsed.name,
    category: normalizeCategory(parsed.typeTag, parsed),
    prerequisites,
    description: summary.description,
    mechanicsHash: summary.mechanicsHash,
    normalizedBenefit: summary.normalizedBenefit,
    source: sourceInfo
  };
}

/**
 * Write updated, alphabetized canonical maps back to disk using atomic safe writes.
 * This version:
 *   - Loads existing canonical maps from disk
 *   - Merges in the in-memory updates
 *   - Sorts the merged maps
 *   - Writes them back safely
 *   - Never deletes existing feats
 */

function sortObjectByKeys(obj) {
  return Object.keys(obj)
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}

function loadCanonical(filePath) {
  delete require.cache[require.resolve(filePath)];
  return require(filePath);
}

function writeCanonicalMaps() {
  const base = __dirname;

  const namesPath = path.join(base, "canonicalFeatNames.js");
  const categoriesPath = path.join(base, "canonicalFeatCategories.js");
  const prereqsPath = path.join(base, "canonicalFeatPrerequisites.js");

  // Load existing maps from disk
  const diskNames = loadCanonical(namesPath);
  const diskCategories = loadCanonical(categoriesPath);
  const diskPrereqs = loadCanonical(prereqsPath);

  // Merge in-memory updates into disk maps
  const mergedNames = { ...diskNames, ...canonicalNames };
  const mergedCategories = { ...diskCategories, ...canonicalCategories };
  const mergedPrereqs = { ...diskPrereqs, ...canonicalPrereqs };

  // Alphabetize
  const sortedNames = sortObjectByKeys(mergedNames);
  const sortedCategories = sortObjectByKeys(mergedCategories);
  const sortedPrereqs = sortObjectByKeys(mergedPrereqs);

  // Write back safely
  safeWrite(
    namesPath,
    "module.exports = " + JSON.stringify(sortedNames, null, 2)
  );

  safeWrite(
    categoriesPath,
    "module.exports = " + JSON.stringify(sortedCategories, null, 2)
  );

  safeWrite(
    prereqsPath,
    "module.exports = " + JSON.stringify(sortedPrereqs, null, 2)
  );
}

/**
 * Write a feat file into the bundle.
 */
function writeFeatFile(featId, featData) {
  const category = featData.category;
  const firstLetter = featId[0].toLowerCase();

  const dir = path.join(
    __dirname,
    "..",
    "bundles",
    "d20-feats",
    category,
    firstLetter
  );

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, `${featId}.js`);

  const header = featData.header;
  const prereqs = featData.prerequisites;
  const desc = featData.description;

  const fileContent = `
/**
 * ${header.canonicalName}
 * Source: ${header.primarySource.book} (${header.primarySource.publisher})
 * Additional Sources: ${JSON.stringify(header.additionalSources)}
 * Alternate Names: ${JSON.stringify(header.alternateNames)}
 */

module.exports = {
  id: "${featId}",
  name: "${header.canonicalName}",
  category: "${category}",
  prerequisites: ${JSON.stringify(prereqs, null, 2)},
  description: ${JSON.stringify(desc, null, 2)},
  mechanicsHash: "${featData.mechanicsHash}",
  normalizedBenefit: ${JSON.stringify(featData.normalizedBenefit, null, 2)}
};
`;

  fs.writeFileSync(filePath, fileContent.trim() + "\n");
}

module.exports = {
  ingestFeat
};
