#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FEATS_ROOT = path.join(ROOT, 'data', 'feats');
const FEAT_MANIFEST_PATH = path.join(FEATS_ROOT, 'manifest.js');
const FEAT_INDEX_PATH = path.join(FEATS_ROOT, 'index.js');

/**
 * Utility: is a directory?
 */
function isDir(p) {
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
}

/**
 * Recursively walk the feats directory and return all .js files
 * except index.js and manifest.js.
 */
function walkFeats(dir, out = []) {
  if (!isDir(dir)) return out;

  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);

    if (isDir(full)) {
      walkFeats(full, out);
      continue;
    }

    if (!entry.endsWith('.js')) continue;
    if (entry === 'index.js' || entry === 'manifest.js') continue;

    out.push(full);
  }

  return out;
}

/**
 * Convert "power_attack" → "Power Attack"
 */
function toTitleCase(id) {
  return id
    .split('_')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

const files = walkFeats(FEATS_ROOT);
console.log(`Found ${files.length} feat files.`);

// In-memory structures for manifest and index
const featMetadata = {}; // id -> { id, name, category, type }
const featRequires = {}; // id -> requirePath (relative to FEATS_ROOT)

/**
 * Process each feat file
 */
for (const filePath of files) {
  const rel = path.relative(FEATS_ROOT, filePath).replace(/\\/g, '/');
  const parts = rel.split('/');

  // Determine category and filename robustly
  let category = null;
  let filename = null;

  if (parts.length === 1) {
    // feats/power_attack.js
    filename = parts[0];
    category = 'misc';
  } else if (parts.length === 2) {
    // feats/combat/power_attack.js
    category = parts[0];
    filename = parts[1];
  } else if (parts.length >= 3) {
    // feats/combat/a/power_attack.js or deeper
    category = parts[0];
    filename = parts[parts.length - 1];
  }

  if (!filename || !filename.endsWith('.js')) {
    console.warn('SKIP (unrecognized path structure):', rel);
    continue;
  }

  const id = filename.replace('.js', '');
  const name = toTitleCase(id);

  let src = fs.readFileSync(filePath, 'utf8');

  // If file already exports id/name/category/type, skip modifying it
  if (src.includes('module.exports') && src.includes('category:') && src.includes('type:')) {
    console.log('SKIP (already has metadata):', rel);
  } else {
    const metadataBlock = `
'use strict';

module.exports = {
  id: '${id}',
  name: '${name}',
  category: '${category}',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};
`;

    const newSrc = metadataBlock + '\n' + src;
    fs.writeFileSync(filePath, newSrc);
    console.log('BOOTSTRAP:', rel);
  }

  // Record for manifest and index
  featMetadata[id] = {
    id,
    name,
    category,
    type: 'feat',
  };

  // Build require path relative to FEATS_ROOT, without .js
  const requirePath = './' + rel.replace(/\.js$/, '');
  featRequires[id] = requirePath;
}

/**
 * Write feat manifest: data/feats/manifest.js
 * id -> metadata
 */
(function writeFeatManifest() {
  const lines = [];
  lines.push(`'use strict';`);
  lines.push('');
  lines.push('module.exports = {');

  const ids = Object.keys(featMetadata).sort();
  for (const id of ids) {
    const meta = featMetadata[id];
    lines.push(`  '${id}': {`);
    lines.push(`    id: '${meta.id}',`);
    lines.push(`    name: '${meta.name}',`);
    lines.push(`    category: '${meta.category}',`);
    lines.push(`    type: '${meta.type}',`);
    lines.push('  },');
  }

  lines.push('};');
  lines.push('');

  fs.writeFileSync(FEAT_MANIFEST_PATH, lines.join('\n'));
  console.log('WROTE feat manifest:', path.relative(ROOT, FEAT_MANIFEST_PATH));
})();

/**
 * Write feat index: data/feats/index.js
 * id -> require('./category/a/feat')
 */
(function writeFeatIndex() {
  const lines = [];
  lines.push(`'use strict';`);
  lines.push('');
  lines.push('module.exports = {');

  const ids = Object.keys(featRequires).sort();
  for (const id of ids) {
    const reqPath = featRequires[id];
    lines.push(`  '${id}': require('${reqPath}'),`);
  }

  lines.push('};');
  lines.push('');

  fs.writeFileSync(FEAT_INDEX_PATH, lines.join('\n'));
  console.log('WROTE feat index:', path.relative(ROOT, FEAT_INDEX_PATH));
})();

console.log('Done bootstrapping feat metadata, manifest, and index.');
