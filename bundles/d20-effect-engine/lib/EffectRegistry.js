'use strict';

class EffectRegistry {
  constructor() {
    this.effects = new Map();
  }

  register(id, effectClass) {
    this.effects.set(id, effectClass);
  }

  get(id) {
    return this.effects.get(id);
  }
}

module.exports = EffectRegistry;
