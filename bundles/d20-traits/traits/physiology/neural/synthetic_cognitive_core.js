'use strict';

module.exports = {
  config: {
    name: "Physiology: Synthetic Cognitive Core",
    description: "A fully artificial but individual consciousness with deterministic processing.",
    type: "trait",
    family: "physiology_synthetic_cognitive_core",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.15,
    initiativeBonus: +3,
    logicBonus: +2,
    immunityToBiologicalConfusion: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.logic === "number") r.logic = current.logic + state.logicBonus;

      return r;
    }
  }
};
