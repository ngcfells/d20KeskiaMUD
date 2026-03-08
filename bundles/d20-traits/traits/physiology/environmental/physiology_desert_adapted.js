'use strict';

module.exports = {
  config: {
    name: "Physiology: Desert Adapted",
    description: "A physiology optimized for arid climates, heat endurance, and water retention.",
    type: "trait",
    family: "physiology_desert_adapted",
    unique: true,
    persists: true
  },

  state: {
    heatResistBonus: +2,
    dehydrationResistBonus: +3,
    sunlightToleranceBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.heatResist === "number") r.heatResist = current.heatResist + state.heatResistBonus;
      if (typeof current.dehydrationResist === "number") r.dehydrationResist = current.dehydrationResist + state.dehydrationResistBonus;
      if (typeof current.sunlightTolerance === "number") r.sunlightTolerance = current.sunlightTolerance + state.sunlightToleranceBonus;
      return r;
    }
  }
};
