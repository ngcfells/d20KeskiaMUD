'use strict';

module.exports = {
  config: {
    name: "Physiology: Eldritch Tendril System",
    description: "A non-Euclidean musculature analog based on eldritch tendrils.",
    type: "trait",
    family: "physiology_eldritch_tendril_system",
    unique: true,
    persists: true
  },

  state: {
    strengthMult: 1.4,
    staminaBonus: +2,
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
