'use strict';

module.exports = {
  config: {
    name: "Physiology: Psionic Neural Matrix",
    description: "Psionically enhanced cognition enabling rapid reaction and coordination.",
    type: "trait",
    family: "physiology_psionic_neural_matrix",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.3,
    initiativeBonus: +4
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.speed === "number") {
        r.speed = Math.floor(current.speed * state.speedMult);
      }

      if (typeof current.initiative === "number") {
        r.initiative = current.initiative + state.initiativeBonus;
      }

      return r;
    }
  }
};
