'use strict';

module.exports = {
  config: {
    name: "Physiology: Heat Acclimated",
    description: "Adapted to hot climates, reducing heat stress and desert fatigue.",
    type: "trait",
    family: "physiology_heat_acclimated",
    unique: true,
    persists: true
  },

  state: {
    heatResist: 2,
    dehydrationResist: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.heatResist === "number") r.heatResist = current.heatResist + state.heatResist;
      if (typeof current.dehydrationResist === "number") r.dehydrationResist = current.dehydrationResist + state.dehydrationResist;
      return r;
    }
  }
};
