'use strict';

module.exports = {
  config: {
    name: "Physiology: Tri-Lobed Neural Core",
    description: "Three independent brain lobes enabling parallel processing.",
    type: "trait",
    family: "physiology_tri_lobed_neural_core",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.1,
    initiativeBonus: +2,
    parallelProcessingBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.parallelProcessing === "number") r.parallelProcessing = current.parallelProcessing + state.parallelProcessingBonus;
      return r;
    }
  }
};
