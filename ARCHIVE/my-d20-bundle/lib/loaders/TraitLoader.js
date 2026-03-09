'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = function loadTraits(state, dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.endsWith('.yml') && !file.endsWith('.yaml')) continue;

    const fullPath = path.join(dir, file);
    const docs = yaml.loadAll(fs.readFileSync(fullPath, 'utf8')) || [];

    for (const trait of docs) {
      if (!trait || !trait.id) continue;
      state.TraitManager.add(trait);
    }
  }
};
