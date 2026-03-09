'use strict';

module.exports = {
  config: {
    name: "Physiology: Urban Adapted",
    description: "A physiology adapted to dense urban environments and pollutants.",
    type: "trait",
    family: "physiology_urban_adapted",
    unique: true,
    persists: true
  },

  state: {
    toxinResistBonus: +2,
    smogResistBonus: +3,
    noiseToleranceBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.toxinResist === "number") r.toxinResist = current.toxinResist + state.toxinResistBonus;
      if (typeof current.smogResist === "number") r.smogResist = current.smogResist + state.smogResistBonus;
      if (typeof current.noiseTolerance === "number") r.noiseTolerance = current.noiseTolerance + state.noiseToleranceBonus;
      return r;
    }
  }
};
