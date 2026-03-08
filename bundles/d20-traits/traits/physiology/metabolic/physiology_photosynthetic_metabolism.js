'use strict';

module.exports = {
  config: {
    name: "Physiology: Photosynthetic Metabolism",
    description: "A metabolism that derives energy from sunlight.",
    type: "trait",
    family: "physiology_photosynthetic_metabolism",
    unique: true,
    persists: true
  },

  state: {
    staminaBonus: +1,
    fatigueRate: -1,
    sunlightRegenBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.stamina === "number") r.stamina = current.stamina + state.staminaBonus;
      if (typeof current.fatigueRate === "number") r.fatigueRate = current.fatigueRate + state.fatigueRate;
      if (typeof current.sunlightRegen === "number") r.sunlightRegen = current.sunlightRegen + state.sunlightRegenBonus;
      return r;
    }
  }
};
