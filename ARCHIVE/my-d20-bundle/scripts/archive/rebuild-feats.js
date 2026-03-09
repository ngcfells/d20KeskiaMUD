#!/usr/bin/env node
'use strict';

/**
 * Rebuilds feats index.js and manifest.js
 * for the Model‑2 folder structure:
 *
 * data/feats/<category>/<letter>/<feat>.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FEATS_ROOT = path.join(ROOT, 'data', 'feats');

// Categories you support
const CATEGORIES = [
  'combat',
  'magic',
  'racial',
  'bloodline',
  'movement',
  'psionic',
  'general',
  'other'
];

// -----------------------------------------------------
// Helper: ensure directory exists
// -----------------------------------------------------
function isDir(p) {
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
}

// -----------------------------------------------------
// STEP 1 — Rebuild index.js
// -----------------------------------------------------
function rebuildIndex() {
  const indexPath = path.join(FEATS_ROOT, 'index.js');
  const registry = [];

  for (const category of CATEGORIES) {
    const categoryPath = path.join(FEATS_ROOT, category);
    if (!isDir(categoryPath)) continue;

    // Only letter directories (a, b, c...)
    const letters = fs.readdirSync(categoryPath)
      .filter(f => isDir(path.join(categoryPath, f)));

    for (const letter of letters) {
      const letterDir = path.join(categoryPath, letter);
      const files = fs.readdirSync(letterDir)
        .filter(f => f.endsWith('.js'));

      for (const file of files) {
        const name = file.replace('.js', '');

        registry.push({
          id: `${category}:${name}`,
          file: `./${category}/${letter}/${file}`,
          name,
          category,
          tags: [],
          type: 'feat'
        });
      }
    }
  }

  const output = `
'use strict';

module.exports = {
  registry: ${JSON.stringify(registry, null, 2)}
};
`;

  fs.writeFileSync(indexPath, output.trim() + '\n');
  console.log(`✔ Rebuilt feats index.js (${registry.length} feats)`);
}

// -----------------------------------------------------
// STEP 2 — Rebuild manifest.js
// -----------------------------------------------------
function rebuildManifest() {
  const manifestPath = path.join(FEATS_ROOT, 'manifest.js');

  const output = `
'use strict';

module.exports = {
  name: 'd20-feats',
  version: '1.0.0',
  description: 'Canonical d20 feat library with category-first alphabetical layout.',
  categories: ${JSON.stringify(CATEGORIES, null, 2)},
  loader: {
    strategy: 'category-first-alpha',
    root: __dirname
  }
};
`;

  fs.writeFileSync(manifestPath, output.trim() + '\n');
  console.log(`✔ Rebuilt feats manifest.js`);
}

// -----------------------------------------------------
// MAIN
// -----------------------------------------------------
console.log('Rebuilding feats index + manifest...');
rebuildIndex();
rebuildManifest();
console.log('Done.');
