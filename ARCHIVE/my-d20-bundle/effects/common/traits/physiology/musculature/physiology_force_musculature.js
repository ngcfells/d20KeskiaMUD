'use strict';

module.exports = {
  config: {
    name: "Physiology: Force Musculature",
    description: "Musculature augmented by Force-based amplification.",
    type: "trait",
    family: "physiology_force_musculature",
    unique: true,
    persists: true
  },

  state: {
    strengthMult: 1.4,
    staminaBonus: +3,
    accelerationBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.strength === "number") r.strength = Math.floor(current.strength * state.strengthMult);
      if (typeof current.stamina === "number") r.stamina = current.stamina + state.staminaBonus;
      if (typeof current.acceleration === "number") r.acceleration = current.acceleration + state.accelerationBonus;
      return r;
    }
  }
};
