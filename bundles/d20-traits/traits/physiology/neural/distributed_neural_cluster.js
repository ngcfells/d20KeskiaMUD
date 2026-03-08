'use strict';

module.exports = {
  config: {
    name: "Physiology: Distributed Neural Cluster",
    description: "Multiple neural nodes reduce reaction latency and improve coordination.",
    type: "trait",
    family: "physiology_distributed_neural_cluster",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.2,
    initiativeBonus: +2
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
