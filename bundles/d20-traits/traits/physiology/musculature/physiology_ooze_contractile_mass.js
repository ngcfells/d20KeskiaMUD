'use strict';

module.exports = {
  config: {
    name: "Physiology: Ooze Contractile Mass",
    description: "Force generation through distributed contractile tissue.",
    type: "trait",
    family: "physiology_ooze_contractile_mass",
    unique: true,
    persists: true
  },

  state: {
    strengthMult: 0.9,
    staminaBonus: +5,
    accelerationBonus: -1
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
