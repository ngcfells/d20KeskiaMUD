'use strict';

module.exports = {
  config: {
    name: "Physiology: Arcane-Infused Musculature",
    description: "Musculature reinforced by arcane energy channels.",
    type: "trait",
    family: "physiology_arcane_infused_musculature",
    unique: true,
    persists: true
  },

  state: {
    strengthMult: 1.25,
    staminaBonus: +4,
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
