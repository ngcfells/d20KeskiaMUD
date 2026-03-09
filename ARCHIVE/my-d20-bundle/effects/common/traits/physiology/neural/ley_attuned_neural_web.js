'use strict';

module.exports = {
  config: {
    name: "Physiology: Ley-Attuned Neural Web",
    description: "A neural architecture partially externalized into ambient magical currents.",
    type: "trait",
    family: "physiology_ley_attuned_neural_web",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.15,
    initiativeBonus: +1,
    arcanePerceptionBonus: +2
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

      if (typeof current.arcanePerception === "number") {
        r.arcanePerception = current.arcanePerception + state.arcanePerceptionBonus;
      }

      return r;
    }
  }
};
