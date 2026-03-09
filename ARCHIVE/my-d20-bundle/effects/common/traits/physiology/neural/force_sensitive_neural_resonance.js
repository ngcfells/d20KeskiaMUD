'use strict';

module.exports = {
  config: {
    name: "Physiology: Force-Sensitive Neural Resonance",
    description: "A neural architecture attuned to the Force, enabling micro-precognition.",
    type: "trait",
    family: "physiology_force_sensitive_neural_resonance",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.1,
    initiativeBonus: +1,
    dangerSenseBonus: +2
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

      if (typeof current.dangerSense === "number") {
        r.dangerSense = current.dangerSense + state.dangerSenseBonus;
      }

      return r;
    }
  }
};
