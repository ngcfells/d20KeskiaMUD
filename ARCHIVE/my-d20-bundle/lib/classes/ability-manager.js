// bundles/my-d20-bundle/lib/classes/ability-manager.js
'use strict';

class AbilityManager {
  constructor() {
    this.abilities = new Map();
  }

  add(id, ability) {
    this.abilities.set(id, ability);
  }

  get(id) {
    return this.abilities.get(id);
  }
}

module.exports = AbilityManager;
