'use strict';

module.exports = {
  config: {
    name: "Physiology: Quantum Coherence Processor",
    description: "A neural architecture based on quantum entanglement and superposition logic.",
    type: "trait",
    family: "physiology_quantum_coherence_processor",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.25,
    initiativeBonus: +5,
    predictionBonus: +2,
    vulnerabilityToEMP: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.prediction === "number") r.prediction = current.prediction + state.predictionBonus;

      return r;
    }
  }
};
