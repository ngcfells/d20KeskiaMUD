'use strict';

module.exports = {
  config: {
    name: "Physiology: Tech Resonance",
    description: "A physiology harmonized with machinery, circuitry, or cybernetic systems.",
    type: "trait",
    family: "physiology_tech_resonance",
    unique: true,
    persists: true
  },

  state: {
    techAffinityBonus: +3,
    naniteResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.techAffinity === "number") r.techAffinity = current.techAffinity + state.techAffinityBonus;
      if (typeof current.naniteResist === "number") r.naniteResist = current.naniteResist + state.naniteResistBonus;
      return r;
    }
  }
};
