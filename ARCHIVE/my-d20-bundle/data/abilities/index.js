// bundles/classes/abilities/index.js
'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (state, abilityManager, rootPath) => {
  const abilityDir = path.join(rootPath, 'abilities');

  if (!fs.existsSync(abilityDir)) return;

  for (const file of fs.readdirSync(abilityDir)) {
    if (!file.endsWith('.js')) continue;

    const id = file.replace('.js', '');
    const ability = require(path.join(abilityDir, file));

    abilityManager.add(id, ability);
  }
};
