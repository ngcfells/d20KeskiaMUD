'use strict';

module.exports = {
  config: {
    name: "Physiology: Force Cognition",
    description: "A cognitive system harmonized with the Force.",
    type: "trait",
    family: "physiology_force_cognition",
    unique: true,
    persists: true
  },

  state: {
    memoryCapacityBonus: +2,
    forceAwarenessBonus: +3,
    fearResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.memoryCapacity === "number") r.memoryCapacity = current.memoryCapacity + state.memoryCapacityBonus;
      if (typeof current.forceAwareness === "number") r.forceAwareness = current.forceAwareness + state.forceAwarenessBonus;
      if (typeof current.fearResist === "number") r.fearResist = current.fearResist + state.fearResistBonus;
      return r;
    }
  }
};
