'use strict';

module.exports = {
  config: {
    name: "Physiology: Force-Harmonic Neural Conduit",
    description: "A neural architecture fully attuned to the Force, enabling active precognition.",
    type: "trait",
    family: "physiology_force_harmonic_neural_conduit",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.2,
    initiativeBonus: +4,
    precognitionBonus: +2
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

      if (typeof current.precognition === "number") {
        r.precognition = current.precognition + state.precognitionBonus;
      }

      return r;
    }
  }
};
