// path: bundles/d20-traits/lib/loaders/trait-loader.js
'use strict';

const fs = require('fs');
const path = require('path');

function loadDirectory(state, dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      loadDirectory(state, fullPath);
      continue;
    }

    if (!entry.name.endsWith('.js')) continue;

    const traitModule = require(fullPath);

    const traits = typeof traitModule === 'function'
      ? traitModule(state)
      : traitModule;

    if (Array.isArray(traits)) {
      for (const trait of traits) {
        if (trait && trait.id) {
          state.TraitManager.add(trait);
        }
      }
    } else if (traits && traits.id) {
      state.TraitManager.add(traits);
    }
  }
}

module.exports = function loadTraits(state, bundlePath) {
  const traitsDir = path.join(bundlePath, 'traits');
  loadDirectory(state, traitsDir);
};
