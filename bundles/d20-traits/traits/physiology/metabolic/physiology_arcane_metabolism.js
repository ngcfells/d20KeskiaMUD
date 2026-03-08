'use strict';

module.exports = {
  config: {
    name: "Physiology: Arcane Metabolism",
    description: "A metabolism sustained by ambient magical energy.",
    type: "trait",
    family: "physiology_arcane_metabolism",
    unique: true,
    persists: true
  },

  state: {
    staminaBonus: +3,
    fatigueRate: -1,
    manaRegenBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.stamina === "number") r.stamina = current.stamina + state.staminaBonus;
      if (typeof current.fatigueRate === "number") r.fatigueRate = current.fatigueRate + state.fatigueRate;
      if (typeof current.manaRegen === "number") r.manaRegen = current.manaRegen + state.manaRegenBonus;
      return r;
    }
  }
};
