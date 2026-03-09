'use strict';

module.exports = {
  config: {
    name: "Physiology: Cybernetic Muscle Augmentation",
    description: "Synthetic actuators augment biological musculature.",
    type: "trait",
    family: "physiology_cybernetic_muscle_augmentation",
    unique: true,
    persists: true
  },

  state: {
    strengthMult: 1.3,
    accelerationBonus: +2,
    staminaBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.strength === "number") r.strength = Math.floor(current.strength * state.strengthMult);
      if (typeof current.acceleration === "number") r.acceleration = current.acceleration + state.accelerationBonus;
      if (typeof current.stamina === "number") r.stamina = current.stamina + state.staminaBonus;
      return r;
    }
  }
};
