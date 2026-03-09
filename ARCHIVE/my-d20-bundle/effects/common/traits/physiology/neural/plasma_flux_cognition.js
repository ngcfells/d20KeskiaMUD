'use strict';

module.exports = {
  config: {
    name: "Physiology: Plasma-Flux Cognition",
    description: "Neural activity expressed as ionized plasma flow.",
    type: "trait",
    family: "physiology_plasma_flux_cognition",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.25,
    initiativeBonus: +3,
    plasmaStabilityBonus: +2
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

      if (typeof current.plasmaStability === "number") {
        r.plasmaStability = current.plasmaStability + state.plasmaStabilityBonus;
      }

      return r;
    }
  }
};
