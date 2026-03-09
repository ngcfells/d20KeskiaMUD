#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { ingestFeat } = require("./featIngestionPipeline");

const [, , inputPath] = process.argv;

if (!inputPath) {
  console.error("Usage: node scripts/ingest-json-feats.js <feats.json>");
  process.exit(1);
}

async function main() {
  const fullPath = path.resolve(inputPath);

  if (!fs.existsSync(fullPath)) {
    console.error("File not found:", fullPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(fullPath, "utf8");
  let feats;

  try {
    feats = JSON.parse(raw);
  } catch (err) {
    console.error("Invalid JSON:", err);
    process.exit(1);
  }

  if (!Array.isArray(feats)) {
    console.error("JSON must be an array of feat objects.");
    process.exit(1);
  }

  console.log(`Ingesting ${feats.length} feats...\n`);

  for (const feat of feats) {
    const { name, rawText, source } = feat;

    if (!rawText || !source) {
      console.error(`Skipping feat "${name}" — missing rawText or source`);
      continue;
    }

    try {
      const result = ingestFeat(rawText, source);
      console.log(`✔ ${name}:`, result.status);
    } catch (err) {
      console.error(`✖ Error ingesting ${name}:`, err);
    }
  }

  console.log("\nDone.");
}

main();
