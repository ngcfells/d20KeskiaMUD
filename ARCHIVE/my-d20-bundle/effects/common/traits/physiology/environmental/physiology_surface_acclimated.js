'use strict';

module.exports = {
  config: {
    name: "Physiology: Surface Acclimated",
    description: "A physiology adapted to surface climates and daylight exposure.",
    type: "trait",
    family: "physiology_surface_acclimated",
    unique: true,
    persists: true
  },

  state: {
    sunlightToleranceBonus: +3,
    coldResistBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.sunlightTolerance === "number") r.sunlightTolerance = current.sunlightTolerance + state.sunlightToleranceBonus;
      if (typeof current.coldResist === "number") r.coldResist = current.coldResist + state.coldResistBonus;
      return r;
    }
  }
};
