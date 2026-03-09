'use strict';

module.exports = {
  config: {
    name: "Physiology: Acid-Resistant",
    description: "A physiology adapted to withstand corrosive substances.",
    type: "trait",
    family: "physiology_acid_resistant",
    unique: true,
    persists: true
  },

  state: {
    acidResistBonus: +5
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.acidResist === "number") r.acidResist = current.acidResist + state.acidResistBonus;
      return r;
    }
  }
};
