#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { fetch } = require("undici");
const { extractAndUpdateFeat } = require("./featExtractor");
const { sanitizeFeatNames } = require("./idNormalizer");
const { detectFeatSection } = require("./featSectionDetector");
const { validateFeatName } = require("./featValidator");

// -----------------------------
// CLI args
// -----------------------------
const [, , inputPathOrUrl, sourceArg, publisherArg] = process.argv;

if (!inputPathOrUrl) {
  console.error("Usage: node scripts/ingest-source.js <url-or-file> [source] [publisher]");
  process.exit(1);
}

const SOURCE = sourceArg || "Unknown Source";
const PUBLISHER = publisherArg || "Unknown Publisher";
const BUNDLE_ROOT = path.resolve(__dirname, "..");

// -----------------------------
// Ingest: URL or file
// -----------------------------
async function loadTextFromInput(input) {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    const archiveMatch = input.match(/archive\.org\/details\/([^\/?#]+)/);
    if (archiveMatch) {
      const identifier = archiveMatch[1];
      return await loadTextFromArchive(identifier);
    }

    const res = await fetch(input);
    if (!res.ok) throw new Error(`Failed to fetch URL: ${res.status} ${res.statusText}`);
    const html = await res.text();
    return html.replace(/<[^>]+>/g, " ");
  }

  return fs.readFileSync(path.resolve(input), "utf8");
}

// -----------------------------
// Archive.org text loader
// -----------------------------
async function loadTextFromArchive(identifier) {
  const metaUrl = `https://archive.org/metadata/${identifier}`;
  const metaRes = await fetch(metaUrl);
  if (!metaRes.ok) throw new Error(`Failed to fetch metadata for ${identifier}`);
  const metadata = await metaRes.json();

  const files = metadata.files || [];
  const txt = files.find(f => f.name.endsWith(".txt"));
  if (!txt) throw new Error("No .txt file found in Archive.org item.");

  const fileUrl = `https://archive.org/download/${identifier}/${txt.name}`;
  const fileRes = await fetch(fileUrl);
  if (!fileRes.ok) throw new Error(`Failed to download ${txt.name}`);
  const buf = Buffer.from(await fileRes.arrayBuffer());
  return buf.toString("utf8");
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
// Classifier (per chunk)
// -----------------------------
async function classifyChunk(text) {
  const prompt = `
You are an extraction engine. Do NOT guess.

You must detect ONLY actual D&D 3.5e FEATS in this chunk.

In THIS book, a valid feat ALWAYS begins with a header line that looks like one of these patterns:

- ALL CAPS feat name followed by a category in brackets:
  Example: WIDEN SPELL [METAMAGIC]
- Title Case feat name followed by a category in brackets:
  Example: Widen Spell [Metamagic]

The header line:
- Is on its own line
- Contains a feat name (one or more words)
- Ends with a category in square brackets, such as [GENERAL], [METAMAGIC], [ITEM CREATION], etc.

A valid feat MUST have:
- A feat header line as described above
- A "Benefit:" line
- A short rules description following "Benefit:"
- Optional "Prerequisite:", "Normal:", or "Special:" lines

A feat is NOT:
- A spell (spells contain lines like "Level:", "Components:", "Casting Time:", "Range:", "Duration:", etc.)
- A class feature or class ability
- A prestige class feature
- A magic item description
- A section heading or category header (e.g. "Item Creation Feats")
- Anything plural or ending in "feats"
- Anything without a "Benefit:" line

If the text does NOT contain any header line matching the feat header pattern above, return:

{ "feats": [] }

You must only return feat NAMES (the text of the header line up to but not including the category brackets).

Return JSON in this exact shape:

{
  "feats": [string]
}

If none are present, return:

{ "feats": [] }

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
  console.log(`Ingesting: ${inputPathOrUrl}`);
  const fullText = await loadTextFromInput(inputPathOrUrl);
  console.log(`Loaded text length: ${fullText.length}`);

  const chunks = chunkText(fullText);
  console.log(`Chunk count: ${chunks.length}`);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const nextChunk = i + 1 < chunks.length ? chunks[i + 1] : "";
    console.log(`\n[Chunk ${i + 1}/${chunks.length}] Analyzing...`);

    const section = detectFeatSection(chunk);
    if (!section.isFeatSection) {
      console.log("  Skipping chunk — not in feats section (heuristic).");
      continue;
    }

    if (!chunkHasFeatHeader(chunk)) {
      console.log("  Skipping chunk — no feat header pattern detected.");
      continue;
    }

    const classes = await classifyChunk(chunk);

    const sanitized = sanitizeFeatNames(classes.feats || [])
      .filter(f => validateFeatName(f.name));

    if (!sanitized.length) {
      console.log("  No valid feats detected in this chunk after validation.");
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

    // Later: add spells/classes/races/rooms extraction here.
  }

  console.log("\nIngestion complete.");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
