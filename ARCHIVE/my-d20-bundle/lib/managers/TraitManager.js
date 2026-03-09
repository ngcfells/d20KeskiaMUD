// path: ./bundles/my-d20-bundle/lib/managers/TraitManager.js
'use strict';

class TraitManager {
  constructor() {
    this.traits = new Map();
  }

  add(trait) {
    this.traits.set(trait.id, trait);
  }

  get(id) {
    return this.traits.get(id);
  }

  has(id) {
    return this.traits.has(id);
  }

  getAll() {
    return this.traits.values();
  }
}

module.exports = TraitManager;
