'use strict';

module.exports = {
  config: {
    name: "Physiology: Myomer Fiber Bundles",
    description: "Synthetic musculature based on electroactive polymer fibers.",
    type: "trait",
    family: "physiology_myomer_fiber_bundles",
    unique: true,
    persists: true
  },

  state: {
    strengthMult: 1.3,
    staminaBonus: +2,
    accelerationBonus: +1
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
