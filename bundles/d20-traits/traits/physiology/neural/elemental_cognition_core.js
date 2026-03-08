'use strict';

module.exports = {
  config: {
    name: "Physiology: Elemental Cognition Core",
    description: "Thought expressed through elemental resonance.",
    type: "trait",
    family: "physiology_elemental_cognition_core",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.1,
    initiativeBonus: +2,
    elementalResonanceBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.elementalResonance === "number") r.elementalResonance = current.elementalResonance + state.elementalResonanceBonus;
      return r;
    }
  }
};
