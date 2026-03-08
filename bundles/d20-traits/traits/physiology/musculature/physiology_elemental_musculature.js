'use strict';

module.exports = {
  config: {
    name: "Physiology: Elemental Musculature",
    description: "Musculature based on elemental resonance rather than biology.",
    type: "trait",
    family: "physiology_elemental_musculature",
    unique: true,
    persists: true
  },

  state: {
    strengthMult: 1.3,
    staminaBonus: +1,
    accelerationBonus: +3
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
