'use strict';

module.exports = {
  config: {
    name: "Physiology: Non-Euclidean Cognition Node",
    description: "A neural architecture operating in higher-dimensional logic.",
    type: "trait",
    family: "physiology_non_euclidean_cognition_node",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.2,
    initiativeBonus: +4,
    dimensionalAwarenessBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.dimensionalAwareness === "number") r.dimensionalAwareness = current.dimensionalAwareness + state.dimensionalAwarenessBonus;
      return r;
    }
  }
};
