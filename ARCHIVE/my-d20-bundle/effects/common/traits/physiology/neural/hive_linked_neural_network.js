'use strict';

module.exports = {
  config: {
    name: "Physiology: Hive-Linked Neural Network",
    description: "A distributed neural architecture shared across multiple bodies.",
    type: "trait",
    family: "physiology_hive_linked_neural_network",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.1,
    initiativeBonus: +1,
    coordinationBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.coordination === "number") r.coordination = current.coordination + state.coordinationBonus;

      return r;
    }
  }
};
