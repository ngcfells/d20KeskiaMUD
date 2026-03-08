'use strict';

module.exports = {
  config: {
    name: "Physiology: Skeletal Musculature",
    description: "Standard biological musculature based on contractile fibers.",
    type: "trait",
    family: "physiology_skeletal_musculature",
    unique: true,
    persists: true
  },

  state: {
    strengthMult: 1.0,
    staminaBonus: 0,
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
