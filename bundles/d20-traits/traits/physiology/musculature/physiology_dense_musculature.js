'use strict';

module.exports = {
  config: {
    name: "Physiology: Dense Musculature",
    description: "A musculature composed of compact, high-density fibers optimized for strength and load-bearing.",
    type: "trait",
    family: "physiology_dense_musculature",
    unique: true,
    persists: true
  },

  state: {
    strengthBonus: +2,
    staminaBonus: +1,
    accelerationPenalty: -1,
    weightMultiplier: 1.25
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.strength === "number") {
        r.strength = current.strength + state.strengthBonus;
      }

      if (typeof current.stamina === "number") {
        r.stamina = current.stamina + state.staminaBonus;
      }

      if (typeof current.acceleration === "number") {
        r.acceleration = current.acceleration + state.accelerationPenalty;
      }

      if (typeof current.weightMultiplier === "number") {
        r.weightMultiplier = current.weightMultiplier * state.weightMultiplier;
      }

      return r;
    }
  }
};
