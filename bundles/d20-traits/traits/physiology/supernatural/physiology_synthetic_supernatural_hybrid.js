'use strict';

module.exports = {
  config: {
    name: "Physiology: Synthetic-Supernatural Hybrid",
    description: "A synthetic body sustained by a supernatural energy core.",
    type: "trait",
    family: "physiology_synthetic_supernatural_hybrid",
    unique: true,
    persists: true
  },

  state: {
    stabilityBonus: +3,
    energyRegenBonus: +3,
    vitalityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.energyRegen === "number") r.energyRegen = current.energyRegen + state.energyRegenBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      if (typeof current.vitality === "number") r.vitality = current.vitality + state.vitalityBonus;
      return r;
    }
  }
};
