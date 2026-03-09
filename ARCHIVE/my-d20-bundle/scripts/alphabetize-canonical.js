#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

// --- Safe atomic writer (Windows‑friendly) ---
function safeWrite(filePath, data) {
  const tmp = filePath + ".tmp";
  fs.writeFileSync(tmp, data);

  const maxRetries = 10;
  const delayMs = 25;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch {}
      }
      fs.renameSync(tmp, filePath);
      return;
    } catch (err) {
      if (attempt === maxRetries) throw err;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delayMs);
    }
  }
}

// --- Helper: sort object keys alphabetically ---
function sortObjectByKeys(obj) {
  return Object.keys(obj)
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}

// --- Paths to your canonical files ---
const base = __dirname;

const files = {
  names: path.join(base, "canonicalFeatNames.js"),
  categories: path.join(base, "canonicalFeatCategories.js"),
  prereqs: path.join(base, "canonicalFeatPrerequisites.js")
};

// --- Load canonical maps DIRECTLY FROM DISK ---
function loadMap(filePath) {
  delete require.cache[require.resolve(filePath)];
  return require(filePath);
}

// --- Alphabetize and write ---
function alphabetize() {
  console.log("Alphabetizing canonical feat maps...");

  // Load the FULL maps from disk
  const names = loadMap(files.names);
  const categories = loadMap(files.categories);
  const prereqs = loadMap(files.prereqs);

  // Sort them
  const sortedNames = sortObjectByKeys(names);
  const sortedCategories = sortObjectByKeys(categories);
  const sortedPrereqs = sortObjectByKeys(prereqs);

  // Write them back safely
  safeWrite(
    files.names,
    "module.exports = " + JSON.stringify(sortedNames, null, 2)
  );

  safeWrite(
    files.categories,
    "module.exports = " + JSON.stringify(sortedCategories, null, 2)
  );

  safeWrite(
    files.prereqs,
    "module.exports = " + JSON.stringify(sortedPrereqs, null, 2)
  );

  console.log("✔ Alphabetization complete.");
}

alphabetize();
