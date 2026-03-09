'use strict';

module.exports = {
  config: {
    name: "Physiology: Pneumatic Musculature",
    description: "Musculature based on pneumatic pressure for lightweight movement.",
    type: "trait",
    family: "physiology_pneumatic_musculature",
    unique: true,
    persists: true
  },

  state: {
    strengthMult: 0.8,
    staminaBonus: +2,
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
