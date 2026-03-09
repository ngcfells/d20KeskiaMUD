// bundles/my-d20-bundle/lib/classes/feat-manager.js
'use strict';

class FeatManager {
  constructor() {
    this.feats = new Map();
  }

  add(id, config) {
    this.feats.set(id, config);
  }

  get(id) {
    return this.feats.get(id);
  }

  has(id) {
    return this.feats.has(id);
  }
}

module.exports = FeatManager;
