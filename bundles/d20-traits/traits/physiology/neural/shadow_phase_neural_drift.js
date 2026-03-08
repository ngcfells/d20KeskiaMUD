'use strict';

module.exports = {
  config: {
    name: "Physiology: Shadow-Phase Neural Drift",
    description: "A partially incorporeal neural architecture drifting between phases.",
    type: "trait",
    family: "physiology_shadow_phase_neural_drift",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.2,
    initiativeBonus: +3,
    phaseAwarenessBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.phaseAwareness === "number") r.phaseAwareness = current.phaseAwareness + state.phaseAwarenessBonus;
      return r;
    }
  }
};
