'use strict';

module.exports = {
  config: {
    name: "Physiology: Distributed Consciousness Field",
    description: "A non-local consciousness spread across matter, energy, or space.",
    type: "trait",
    family: "physiology_distributed_consciousness_field",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.3,
    initiativeBonus: +6,
    fieldAwarenessBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.fieldAwareness === "number") r.fieldAwareness = current.fieldAwareness + state.fieldAwarenessBonus;

      return r;
    }
  }
};
