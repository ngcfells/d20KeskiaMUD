'use strict';

module.exports = {
  config: {
    name: "Physiology: Celestial Harmonic Mind",
    description: "Ordered, luminous cognition aligned with celestial harmonics.",
    type: "trait",
    family: "physiology_celestial_harmonic_mind",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.15,
    initiativeBonus: +3,
    harmonyBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.harmony === "number") r.harmony = current.harmony + state.harmonyBonus;
      return r;
    }
  }
};
