'use strict';

module.exports = {
  config: {
    name: "Physiology: Force-Cybernetic Fusion",
    description: "Cybernetic systems harmonized with the Force.",
    type: "trait",
    family: "physiology_force_cybernetic_fusion",
    unique: true,
    persists: true
  },

  state: {
    forceRegenBonus: +2,
    durabilityBonus: +2,
    accelerationBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.forceRegen === "number") r.forceRegen = current.forceRegen + state.forceRegenBonus;
      if (typeof current.durability === "number") r.durability = current.durability + state.durabilityBonus;
      if (typeof current.acceleration === "number") r.acceleration = current.acceleration + state.accelerationBonus;
      return r;
    }
  }
};
