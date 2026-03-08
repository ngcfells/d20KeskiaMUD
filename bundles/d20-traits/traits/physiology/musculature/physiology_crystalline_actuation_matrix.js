'use strict';

module.exports = {
  config: {
    name: "Physiology: Crystalline Actuation Matrix",
    description: "Force generation through crystalline resonance and vibration.",
    type: "trait",
    family: "physiology_crystalline_actuation_matrix",
    unique: true,
    persists: true
  },

  state: {
    strengthMult: 1.15,
    staminaBonus: +3,
    accelerationBonus: 0
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
