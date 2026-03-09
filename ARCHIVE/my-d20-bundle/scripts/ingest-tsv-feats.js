#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { ingestFeat } = require("./featIngestionPipeline");

const [, , inputPath, sourceBook, publisher] = process.argv;

if (!inputPath) {
  console.error("Usage: node scripts/ingest-tsv-feats.js <file.txt> [book] [publisher]");
  process.exit(1);
}

const BOOK = sourceBook || "SRD";
const PUBLISHER = publisher || "Paizo";

function loadLines(filePath) {
  const full = path.resolve(filePath);
  if (!fs.existsSync(full)) {
    throw new Error("File not found: " + full);
  }
  return fs.readFileSync(full, "utf8")
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

function parseTsvLine(line) {
  // Skip empty or garbage lines
  if (!line || !line.trim()) return null;

  let parts;

  // 1. Prefer real tabs
  if (line.includes("\t")) {
    parts = line.split("\t").map(s => s.trim());
  } else {
    // 2. Fallback: treat 2+ spaces as a column separator
    parts = line.split(/ {2,}/).map(s => s.trim());
  }

  // 3. Must have at least 3 columns
  if (parts.length < 3) {
    console.warn(`Skipping non-feat or malformed line: ${line}`);
    return null;
  }

  return {
    name: parts[0],
    prerequisitesRaw: parts[1],
    descriptionRaw: parts.slice(2).join(" "), // merge extra columns safely
    source: {
      system: "pf1",
      book: BOOK,
      publisher: PUBLISHER
    }
  };
}


async function main() {
  console.log(`Loading TSV feats from: ${inputPath}`);

  const lines = loadLines(inputPath);
  console.log(`Found ${lines.length} feat lines.`);

  for (const line of lines) {
    try {
      const feat = parseTsvLine(line);
      const result = ingestFeat(feat, feat.source);
      console.log(`✔ ${feat.name}: ${result.status}`);
    } catch (err) {
      console.error(`✖ Error processing line: ${line}`);
      console.error(err);
    }
  }

  console.log("\nIngestion complete.");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
