'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = function loadLanguages(state, dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.endsWith('.yml') && !file.endsWith('.yaml')) continue;

    const fullPath = path.join(dir, file);
    const docs = yaml.loadAll(fs.readFileSync(fullPath, 'utf8')) || [];

    for (const lang of docs) {
      if (!lang || !lang.id) continue;
      state.LanguageManager.add(lang);
    }
  }
};
