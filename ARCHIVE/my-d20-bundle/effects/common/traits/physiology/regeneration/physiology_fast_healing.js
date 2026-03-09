'use strict';

module.exports = {
  config: {
    name: "Physiology: Fast Healing",
    description: "Accelerated biological tissue repair.",
    type: "trait",
    family: "physiology_fast_healing",
    unique: true,
    persists: true
  },

  state: {
    regenBonus: +2,
    staminaRegenBonus: +1
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
