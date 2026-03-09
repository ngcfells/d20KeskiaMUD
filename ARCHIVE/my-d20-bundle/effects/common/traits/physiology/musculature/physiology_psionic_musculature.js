'use strict';

module.exports = {
  config: {
    name: "Physiology: Psionic Musculature",
    description: "Musculature supported by psionic force application.",
    type: "trait",
    family: "physiology_psionic_musculature",
    unique: true,
    persists: true
  },

  state: {
    strengthMult: 1.2,
    staminaBonus: +2,
    accelerationBonus: +4
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
