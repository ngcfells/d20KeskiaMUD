'use strict';

module.exports = {
  config: {
    name: "Physiology: Full Regrowth",
    description: "Complete limb and organ regrowth.",
    type: "trait",
    family: "physiology_full_regrowth",
    unique: true,
    persists: true
  },

  state: {
    regenBonus: +6,
    staminaRegenBonus: +3,
    fullRegrowth: true
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
