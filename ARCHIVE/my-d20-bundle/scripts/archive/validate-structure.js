#!/usr/bin/env node
'use strict';

/**
 * D20 Bundle Validator + Migrator
 * --------------------------------
 * - Validates folder structure
 * - Migrates feats from old alphabetical layout to Model 2:
 *      data/feats/<category>/<letter>/<feat>.js
 * - Auto-categorizes feats using filename heuristics
 * - Rebuilds feats index.js and manifest.js
 * - Generates a migration report
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FEATS_ROOT = path.join(ROOT, 'data', 'feats');

// ---------------------------------------------
// CATEGORY DEFINITIONS
// ---------------------------------------------
const CATEGORIES = {
  combat: [
    'attack', 'strike', 'maneuver', 'weapon', 'armor', 'shield',
    'shot', 'archer', 'archery', 'grapple', 'trip', 'disarm',
    'bullrush', 'sunder', 'overrun', 'tumble', 'dodge', 'mobility'
  ],
  magic: [
    'spell', 'arcane', 'divine', 'mana', 'caster', 'metamagic',
    'wizard', 'sorcerer', 'cleric', 'warlock', 'mystic'
  ],
  racial: [
    'elf', 'dwarf', 'halfling', 'orc', 'human', 'gnome', 'changeling',
    'zabrak', 'twilek', 'sullustan', 'ithorian', 'kalashtar', 'shifter'
  ],
  bloodline: [
    'bloodline', 'heritage', 'ancestral'
  ],
  movement: [
    'agile', 'mobility', 'swim', 'climb', 'jump', 'tumble', 'flight',
    'airborne', 'aerial'
  ],
  psionic: [
    'psionic', 'mind', 'psychic', 'tele', 'telepathy', 'telekinetic'
  ],
  general: [
    'alertness', 'endurance', 'toughness', 'skill', 'focus', 'training'
  ],
  other: [] // fallback
};

// ---------------------------------------------
// HELPERS
// ---------------------------------------------
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getCategory(featName) {
  const lower = featName.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some(k => lower.includes(k))) {
      return category;
    }
  }
  return 'other';
}

function walk(dir) {
  return fs.readdirSync(dir).map(f => path.join(dir, f));
}

// ---------------------------------------------
// STEP 1 — VALIDATE OLD STRUCTURE
// ---------------------------------------------
function findOldFeats() {
  const old = [];
  const letters = fs.readdirSync(FEATS_ROOT)
    .filter(f => /^[a-z]$/.test(f));

  for (const letter of letters) {
    const letterDir = path.join(FEATS_ROOT, letter);
    const files = fs.readdirSync(letterDir)
      .filter(f => f.endsWith('.js'));

    for (const file of files) {
      old.push({
        file,
        letter,
        full: path.join(letterDir, file)
      });
    }
  }

  return old;
}

// ---------------------------------------------
// STEP 2 — MIGRATE FEATS
// ---------------------------------------------
function migrateFeats() {
  const feats = findOldFeats();
  const report = {};

  for (const feat of feats) {
    const base = feat.file.replace('.js', '');
    const category = getCategory(base);

    const targetDir = path.join(FEATS_ROOT, category, feat.letter);
    ensureDir(targetDir);

    const targetPath = path.join(targetDir, feat.file);

    // Move file
    fs.renameSync(feat.full, targetPath);

    if (!report[category]) report[category] = 0;
    report[category]++;
  }

  return report;
}

// ---------------------------------------------
// STEP 3 — REBUILD INDEX
// ---------------------------------------------
function rebuildIndex() {
  const indexPath = path.join(FEATS_ROOT, 'index.js');

  const categories = fs.readdirSync(FEATS_ROOT)
    .filter(f => fs.statSync(path.join(FEATS_ROOT, f)).isDirectory())
    .filter(f => Object.keys(CATEGORIES).includes(f));

  const registry = [];

  for (const category of categories) {
    const categoryPath = path.join(FEATS_ROOT, category);
const letters = fs.readdirSync(categoryPath)
  .filter(f => fs.statSync(path.join(categoryPath, f)).isDirectory());


    for (const letter of letters) {
      const dir = path.join(FEATS_ROOT, category, letter);
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

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
}

// ---------------------------------------------
// STEP 4 — REBUILD MANIFEST
// ---------------------------------------------
function rebuildManifest() {
  const manifestPath = path.join(FEATS_ROOT, 'manifest.js');

  const output = `
'use strict';

module.exports = {
  name: 'd20-feats',
  version: '1.0.0',
  description: 'Canonical d20 feat library with category-first alphabetical layout.',
  categories: ${JSON.stringify(Object.keys(CATEGORIES), null, 2)},
  loader: {
    strategy: 'category-first-alpha',
    root: __dirname
  }
};
`;

  fs.writeFileSync(manifestPath, output.trim() + '\n');
}

// ---------------------------------------------
// MAIN
// ---------------------------------------------
console.log('Validating and migrating feats...');

const report = migrateFeats();
rebuildIndex();
rebuildManifest();

console.log('\nMigration complete.\n');
console.log('Feats moved:');
console.log(report);
console.log('\nDone.\n');
