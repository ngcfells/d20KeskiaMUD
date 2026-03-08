'use strict';

module.exports = {
  config: {
    name: "Physiology: Psychic Sensitivity",
    description: "Heightened psionic senses allow detection of tremors, emotional echoes, and surface thoughts.",
    type: "trait",
    family: "physiology_psychic_sensitivity",
    unique: true,
    persists: true
  },

  state: {
    tremorSenseBonus: 1,
    empathyBonus: 1,
    surfaceThoughtRange: 10
  },

  modifiers: {
    senses(current, state) {
      const r = {};

      if (typeof current.tremorSense === "number")
        r.tremorSense = current.tremorSense + state.tremorSenseBonus;

      if (typeof current.empathy === "number")
        r.empathy = current.empathy + state.empathyBonus;

      if (typeof current.surfaceThoughtRange === "number")
        r.surfaceThoughtRange = current.surfaceThoughtRange + state.surfaceThoughtRange;

      return r;
    }
  }
};
