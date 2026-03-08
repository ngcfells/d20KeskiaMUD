'use strict';

module.exports = {
  config: {
    name: "Physiology: Force Metabolism",
    description: "A metabolism sustained by the Force, providing extremely efficient energy cycling and resilience.",
    type: "trait",
    family: "physiology_force_metabolism",
    unique: true,
    persists: true
  },

  state: {
    staminaBonus: +4,
    fatigueRate: -3,
    forceRegenBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      // Stamina scaling
      if (typeof current.stamina === "number") {
        r.stamina = current.stamina + state.staminaBonus;
      }

      // Fatigue reduction
      if (typeof current.fatigueRate === "number") {
        r.fatigueRate = current.fatigueRate + state.fatigueRate;
      }

      // Force regeneration
      if (typeof current.forceRegen === "number") {
        r.forceRegen = current.forceRegen + state.forceRegenBonus;
      }

      return r;
    }
  }
};
