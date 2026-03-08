'use strict';

module.exports = {
  config: {
    name: "Physiology: Crystalline Resonance Metabolism",
    description: "A metabolism based on harmonic resonance within crystalline structures.",
    type: "trait",
    family: "physiology_crystalline_resonance_metabolism",
    unique: true,
    persists: true
  },

  state: {
    staminaBonus: +1,
    fatigueRate: -2,
    resonanceRegenBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.resonanceRegen === "number") r.resonanceRegen = current.resonanceRegen + state.resonanceRegenBonus;
      if (typeof current.fatigueRate === "number") r.fatigueRate = current.fatigueRate + state.fatigueRate;
      return r;
    }
  }
};
