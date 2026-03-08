'use strict';

module.exports = {
  config: {
    name: "Physiology: Machine Learning Neural Mesh",
    description: "An adaptive synthetic neural architecture that improves through pattern recognition.",
    type: "trait",
    family: "physiology_machine_learning_neural_mesh",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.1,
    initiativeBonus: +2,
    adaptationBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.adaptation === "number") r.adaptation = current.adaptation + state.adaptationBonus;

      return r;
    }
  }
};
