'use strict';

module.exports = {
  config: {
    name: "Physiology: Hydraulic Musculature",
    description: "Musculature based on hydraulic pressure for movement and force.",
    type: "trait",
    family: "physiology_hydraulic_musculature",
    unique: true,
    persists: true
  },

  state: {
    strengthMult: 1.2,
    staminaBonus: -1,
    accelerationBonus: -1,
    stabilityBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.strength === "number") r.strength = Math.floor(current.strength * state.strengthMult);
      if (typeof current.stamina === "number") r.stamina = current.stamina + state.staminaBonus;
      if (typeof current.acceleration === "number") r.acceleration = current.acceleration + state.accelerationBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      return r;
    }
  }
};
