// lib/loaders/MaterialLoader2.js
'use strict';

const fs = require('fs');
const path = require('path');

class MaterialManager {
  constructor() {
    this.materials = new Map();
  }

  add(def) {
    this.materials.set(def.id, def);
  }

  get(id) {
    return this.materials.get(id) || null;
  }
}

module.exports = (state, rootPath) => {
  const manager = new MaterialManager();
  const dir = path.join(rootPath, 'data', 'materials');

  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.js')) continue;
      const def = require(path.join(dir, file));
      manager.add(def);
    }
  }

  state.MaterialManager = manager;
};
