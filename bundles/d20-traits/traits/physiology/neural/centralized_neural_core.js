'use strict';

module.exports = {
  config: {
    name: "Physiology: Centralized Neural Core",
    description: "A single primary neural center; baseline humanoid architecture.",
    type: "trait",
    family: "physiology_centralized_neural_core",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.0,
    initiativeBonus: 0
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
