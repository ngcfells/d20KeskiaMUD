'use strict';

module.exports = {
  config: {
    name: "Physiology: Crystalline Neural Matrix",
    description: "Thought encoded in lattice vibrations within a crystalline neural structure.",
    type: "trait",
    family: "physiology_crystalline_neural_matrix",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.2,
    initiativeBonus: +3,
    resonanceBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.resonance === "number") r.resonance = current.resonance + state.resonanceBonus;
      return r;
    }
  }
};
