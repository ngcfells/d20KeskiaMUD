'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = function loadRaces(state, dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (!file.endsWith('.yml') && !file.endsWith('.yaml')) continue;

    const fullPath = path.join(dir, file);
    const docs = yaml.loadAll(fs.readFileSync(fullPath, 'utf8')) || [];

    for (const race of docs) {
      if (!race || !race.id) continue;
      state.RaceManager.add(race);
    }
  }
};
