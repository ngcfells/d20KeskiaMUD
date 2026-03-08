'use strict';

module.exports = {
  config: {
    name: "Physiology: Hivemind Cognition",
    description: "A distributed cognitive system shared across multiple bodies.",
    type: "trait",
    family: "physiology_hivemind_cognition",
    unique: true,
    persists: true
  },

  state: {
    memoryCapacityBonus: +4,
    charmImmunity: true,
    fearImmunity: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.memoryCapacity === "number") r.memoryCapacity = current.memoryCapacity + state.memoryCapacityBonus;
      if (state.charmImmunity) r.charmImmunity = true;
      if (state.fearImmunity) r.fearImmunity = true;
      return r;
    }
  }
};
