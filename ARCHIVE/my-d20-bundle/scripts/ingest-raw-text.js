#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { fetch } = require("undici");

const { extractAndUpdateFeat } = require("./featExtractor");
const { sanitizeFeatNames } = require("./idNormalizer");
const { detectFeatSection, chunkHasFeatHeader } = require("./featSectionDetector");
const { validateFeatName } = require("./featValidator");

const [, , inputPath, sourceArg, publisherArg] = process.argv;

if (!inputPath) {
  console.error("Usage: node scripts/ingest-raw-text.js <file.txt> [source] [publisher]");
  process.exit(1);
}

const SOURCE = sourceArg || "Unknown Source";
const PUBLISHER = publisherArg || "Unknown Publisher";
const BUNDLE_ROOT = path.resolve(__dirname, "..");

// -----------------------------
// Load raw text file
// -----------------------------
function loadRawText(filePath) {
  const full = path.resolve(filePath);
  if (!fs.existsSync(full)) {
    throw new Error("File not found: " + full);
  }
  return fs.readFileSync(full, "utf8");
}

// -----------------------------
// Chunker
// -----------------------------
function chunkText(text, size = 10000, overlap = 500) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

// -----------------------------
// LLM classifier
// -----------------------------
async function classifyChunk(text) {
  const prompt = `
You are an extraction engine. Do NOT guess.

Detect ONLY actual feats in this chunk. A feat has:
- A header line (Feat Name)
- A "Prerequisites:" line
- A "Benefit:" line

Return JSON:
{ "feats": [string] }

Text:
${text.slice(0, 8000)}
`;

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
  const raw = (data.response || "").trim();

  try {
    return JSON.parse(raw);
  } catch {
    return { feats: [] };
  }
}

// -----------------------------
// Main driver
// -----------------------------
async function main() {
  console.log(`Ingesting raw text file: ${inputPath}`);

  const fullText = loadRawText(inputPath);
  console.log(`Loaded text length: ${fullText.length}`);

  const chunks = chunkText(fullText);
  console.log(`Chunk count: ${chunks.length}`);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const nextChunk = i + 1 < chunks.length ? chunks[i + 1] : "";

    console.log(`\n[Chunk ${i + 1}/${chunks.length}] Analyzing...`);

    const section = detectFeatSection(chunk);
    if (!section.isFeatSection) {
      console.log("  Skipping chunk — not a feat section.");
      continue;
    }

    if (!chunkHasFeatHeader(chunk)) {
      console.log("  Skipping chunk — no feat header detected.");
      continue;
    }

    const classes = await classifyChunk(chunk);

    const sanitized = sanitizeFeatNames(classes.feats || [])
      .filter(f => validateFeatName(f.name));

    if (!sanitized.length) {
      console.log("  No valid feats detected.");
      continue;
    }

    console.log("  Valid feats:", sanitized.map(f => f.name).join(", "));

    for (const feat of sanitized) {
      console.log(`  → Extracting feat: ${feat.name}`);

      const result = await extractAndUpdateFeat({
        bundleRoot: BUNDLE_ROOT,
        featName: feat.name,
        chunkText: chunk,
        nextChunkText: nextChunk,
        source: SOURCE,
        publisher: PUBLISHER
      });

      console.log("    Result:", result);
    }
  }

  console.log("\nIngestion complete.");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
