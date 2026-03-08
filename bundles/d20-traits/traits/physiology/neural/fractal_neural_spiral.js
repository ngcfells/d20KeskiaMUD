'use strict';

module.exports = {
  config: {
    name: "Physiology: Fractal Neural Spiral",
    description: "Self-similar recursive neural patterns enabling multi-layered cognition.",
    type: "trait",
    family: "physiology_fractal_neural_spiral",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.15,
    initiativeBonus: +3,
    recursionBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.recursion === "number") r.recursion = current.recursion + state.recursionBonus;
      return r;
    }
  }
};
