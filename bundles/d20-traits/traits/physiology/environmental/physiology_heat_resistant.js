'use strict';

module.exports = {
  config: {
    name: "Physiology: Heat Resistant",
    description: "A physiology resistant to high temperatures.",
    type: "trait",
    family: "physiology_heat_resistant",
    unique: true,
    persists: true
  },

  state: {
    heatResistBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.heatResist === "number") r.heatResist = current.heatResist + state.heatResistBonus;
      return r;
    }
  }
};
