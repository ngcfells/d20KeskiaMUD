'use strict';

module.exports = {
  config: {
    name: "Physiology: Planar Adapted",
    description: "A physiology capable of surviving planar distortions and low-gravity environments.",
    type: "trait",
    family: "physiology_planar_adapted",
    unique: true,
    persists: true
  },

  state: {
    gravityToleranceBonus: +3,
    planarResistBonus: +2,
    voidAffinityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.gravityTolerance === "number") r.gravityTolerance = current.gravityTolerance + state.gravityToleranceBonus;
      if (typeof current.planarResist === "number") r.planarResist = current.planarResist + state.planarResistBonus;
      if (typeof current.voidAffinity === "number") r.voidAffinity = current.voidAffinity + state.voidAffinityBonus;
      return r;
    }
  }
};
