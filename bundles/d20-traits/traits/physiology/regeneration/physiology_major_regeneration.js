'use strict';

module.exports = {
  config: {
    name: "Physiology: Major Regeneration",
    description: "Rapid healing and partial limb regrowth.",
    type: "trait",
    family: "physiology_major_regeneration",
    unique: true,
    persists: true
  },

  state: {
    regenBonus: +4,
    staminaRegenBonus: +2,
    limbRegrowth: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.regen === "number") r.regen = current.regen + state.regenBonus;
      if (typeof current.staminaRegen === "number") r.staminaRegen = current.staminaRegen + state.staminaRegenBonus;
      return r;
    }
  }
};
