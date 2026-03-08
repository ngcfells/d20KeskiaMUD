'use strict';

module.exports = {
  config: {
    name: "Physiology: Cybernetic Neural Grid",
    description: "Cybernetic or synthetic neural architecture enabling rapid data processing.",
    type: "trait",
    family: "physiology_cybernetic_neural_grid",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.25,
    initiativeBonus: +3
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
