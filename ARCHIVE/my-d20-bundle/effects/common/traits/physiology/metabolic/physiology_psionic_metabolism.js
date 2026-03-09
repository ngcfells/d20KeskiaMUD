'use strict';

module.exports = {
  config: {
    name: "Physiology: Psionic Metabolism",
    description: "A metabolism sustained by psionic energy.",
    type: "trait",
    family: "physiology_psionic_metabolism",
    unique: true,
    persists: true
  },

  state: {
    staminaBonus: +2,
    fatigueRate: -2,
    psiRegenBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.fatigueRate === "number") r.fatigueRate = current.fatigueRate + state.fatigueRate;
      if (typeof current.psiRegen === "number") r.psiRegen = current.psiRegen + state.psiRegenBonus;
      return r;
    }
  }
};
