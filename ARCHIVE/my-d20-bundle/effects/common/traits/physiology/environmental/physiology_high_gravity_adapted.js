'use strict';

module.exports = {
  config: {
    name: "Physiology: High Gravity Adapted",
    description: "A physiology evolved under high gravity conditions.",
    type: "trait",
    family: "physiology_high_gravity_adapted",
    unique: true,
    persists: true
  },

  state: {
    strengthBonus: +1,
    knockbackResistBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.strength === "number") r.strength = current.strength + state.strengthBonus;
      if (typeof current.knockbackResist === "number") r.knockbackResist = current.knockbackResist + state.knockbackResistBonus;
      return r;
    }
  }
};
