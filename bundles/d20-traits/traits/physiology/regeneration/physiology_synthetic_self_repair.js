'use strict';

module.exports = {
  config: {
    name: "Physiology: Synthetic Self-Repair",
    description: "Synthetic materials capable of autonomous repair.",
    type: "trait",
    family: "physiology_synthetic_self_repair",
    unique: true,
    persists: true
  },

  state: {
    durabilityRegenBonus: +4,
    energyRegenBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.durabilityRegen === "number") r.durabilityRegen = current.durabilityRegen + state.durabilityRegenBonus;
      if (typeof current.energyRegen === "number") r.energyRegen = current.energyRegen + state.energyRegenBonus;
      return r;
    }
  }
};
