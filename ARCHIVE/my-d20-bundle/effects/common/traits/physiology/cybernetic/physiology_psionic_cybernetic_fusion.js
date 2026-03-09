'use strict';

module.exports = {
  config: {
    name: "Physiology: Psionic-Cybernetic Fusion",
    description: "Cybernetic systems integrated with psionic control fields.",
    type: "trait",
    family: "physiology_psionic_cybernetic_fusion",
    unique: true,
    persists: true
  },

  state: {
    psiRegenBonus: +2,
    accelerationBonus: +2,
    stabilityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.psiRegen === "number") r.psiRegen = current.psiRegen + state.psiRegenBonus;
      if (typeof current.acceleration === "number") r.acceleration = current.acceleration + state.accelerationBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      return r;
    }
  }
};
