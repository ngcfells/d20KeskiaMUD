'use strict';

module.exports = {
  config: {
    name: "Physiology: Planar-Tech Integration",
    description: "Cybernetic systems constructed from planar materials or energies.",
    type: "trait",
    family: "physiology_planar_tech_integration",
    unique: true,
    persists: true
  },

  state: {
    stabilityBonus: +2,
    durabilityBonus: +3,
    planarResonanceBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.planarResonance === "number") r.planarResonance = current.planarResonance + state.planarResonanceBonus;
      if (typeof current.durability === "number") r.durability = current.durability + state.durabilityBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      return r;
    }
  }
};
