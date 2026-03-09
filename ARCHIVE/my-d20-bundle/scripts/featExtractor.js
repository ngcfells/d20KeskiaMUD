"use strict";

const fs = require("fs");
const path = require("path");
const { fetch } = require("undici");

/* ---------------------------------------------------------
   1. Escape feat name for regex
--------------------------------------------------------- */
function escapeForRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ---------------------------------------------------------
   2. Detect feat header inside merged text
--------------------------------------------------------- */
function findFeatHeader(text, featName) {
  const escaped = escapeForRegex(featName);
  const headerRe = new RegExp("^" + escaped + "\\s*\\[[^\\]]+\\]", "im");
  return text.match(headerRe);
}

/* ---------------------------------------------------------
   3. Extract feat body (from header to next header)
      Works on mergedText = chunk + nextChunk
--------------------------------------------------------- */
function extractFeatBody(mergedText, featName) {
  const headerMatch = findFeatHeader(mergedText, featName);
  if (!headerMatch) return null;

  const startIndex = headerMatch.index;

  // Next header: allow ALL CAPS or Title Case with [Category]
  const nextHeaderRe = /^[A-Z][A-Za-z\s'\-]+?\s*\[[A-Za-z\s'\-]+\]/gm;
  nextHeaderRe.lastIndex = startIndex + 1;

  const nextHeaderMatch = nextHeaderRe.exec(mergedText);
  const endIndex = nextHeaderMatch ? nextHeaderMatch.index : mergedText.length;

  return mergedText.slice(startIndex, endIndex).trim();
}

/* ---------------------------------------------------------
   4. Validate Benefit: block
--------------------------------------------------------- */
function hasBenefitBlock(text) {
  if (!text) return false;

  // Must have Benefit:
  if (!/^\s*Benefit\s*:/im.test(text)) return false;

  // Reject spells
  if (/Level\s*:/i.test(text)) return false;
  if (/Components\s*:/i.test(text)) return false;
  if (/Casting Time\s*:/i.test(text)) return false;
  if (/Range\s*:/i.test(text)) return false;
  if (/Duration\s*:/i.test(text)) return false;

  // Reject class abilities
  if (/\b(Ex|Su|Sp)\b/.test(text)) return false;

  return true;
}

/* ---------------------------------------------------------
   5. Build strict LLM prompt
--------------------------------------------------------- */
function buildFeatPrompt(featName, text, source, publisher) {
  return `
You are an extraction engine. You MUST NOT guess or invent information.

Extract ONLY the feat named "${featName}" from the text below.
If the feat is not fully present, return EXACTLY: null

Return JSON in this exact shape:

{
  "id": string,
  "name": string,
  "category": string,
  "type": "feat",
  "description": string,
  "prerequisites": {
    "baseAttackBonus": number | null,
    "abilityScores": { },
    "skills": { },
    "feats": [string],
    "classFeatures": [string],
    "race": string | null,
    "alignment": string | null
  },
  "stanceEffects": {
    "base": {},
    "aggressive": {},
    "defensive": {},
    "perceptive": {}
  },
  "hooks": {},
  "metadata": {
    "source": "${source}",
    "publisher": "${publisher}"
  }
}

Text:
${text.slice(0, 20000)}
`;
}

/* ---------------------------------------------------------
   6. Ask Llama
--------------------------------------------------------- */
async function askLlama(prompt) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.1",
      prompt,
      stream: false
    })
  });

  const data = await res.json();
  return data.response;
}

/* ---------------------------------------------------------
   7. Validate JSON
--------------------------------------------------------- */
function validateFeatJSON(raw) {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (trimmed === "null") return null;

  try {
    const feat = JSON.parse(trimmed);
    if (!feat || typeof feat !== "object") return null;
    if (feat.type !== "feat") return null;
    if (!feat.id || !feat.name) return null;
    return feat;
  } catch {
    return null;
  }
}

/* ---------------------------------------------------------
   8. File path generator
--------------------------------------------------------- */
function getFeatFilePath(bundleRoot, feat) {
  let category = feat.category || "general";
  const letter = feat.id[0].toLowerCase();
  const { allowedCategories } = require("./archive/featCategories");

  if (!allowedCategories.includes(category)) {
    category = "other";
  }

  return path.join(
    bundleRoot,
    "data",
    "feats",
    category,
    letter,
    `${feat.id}.js`
  );
}

/* ---------------------------------------------------------
   9. Render JS
--------------------------------------------------------- */
function renderFeatJS(feat) {
  return `module.exports = ${JSON.stringify(feat, null, 2)};`;
}

/* ---------------------------------------------------------
   10. Write file
--------------------------------------------------------- */
function writeFeatFile(filePath, feat) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, renderFeatJS(feat), "utf8");
}

/* ---------------------------------------------------------
   11. Main extraction function (boundary-aware + LLM-gated)
--------------------------------------------------------- */
async function extractAndUpdateFeat({
  bundleRoot,
  featName,
  chunkText,
  nextChunkText,   // <-- NEW: pass the next chunk in
  source,
  publisher
}) {
  const mergedText = chunkText + "\n" + (nextChunkText || "");

  // Step 1: Extract feat body from merged text
  const body = extractFeatBody(mergedText, featName);
  if (!body) return { updated: false, reason: "not_found_in_chunk" };

  // Step 2: Validate Benefit:
  if (!hasBenefitBlock(body)) {
    return { updated: false, reason: "no_benefit_block" };
  }

  // Step 3: Ask LLM on the *body*, not the whole chunk
  const prompt = buildFeatPrompt(featName, body, source, publisher);
  const raw = await askLlama(prompt);
  const feat = validateFeatJSON(raw);
  if (!feat) return { updated: false, reason: "llm_rejected" };

  // Step 4: Enforce name + ID + category (no LLM freelancing)
  const { toSnakeCase } = require("./idNormalizer");
  const { normalizeFeatCategory } = require("./categoryNormalizer");

  feat.name = featName;
  feat.id = toSnakeCase(feat.name);
  feat.category = normalizeFeatCategory(feat.category);

  // Step 5: Attach metadata (in case model omitted it)
  feat.metadata = feat.metadata || {};
  feat.metadata.source = source;
  feat.metadata.publisher = publisher;

  // Step 6: Write file
  const filePath = getFeatFilePath(bundleRoot, feat);
  writeFeatFile(filePath, feat);

  return { updated: true, created: true, filePath };
}

module.exports = {
  extractAndUpdateFeat
};
