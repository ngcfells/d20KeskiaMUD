'use strict';

module.exports = {
  config: {
    name: "Physiology: Force Aging",
    description: "A physiology whose aging is influenced by the Force.",
    type: "trait",
    family: "physiology_force_aging",
    unique: true,
    persists: true
  },

  state: {
    lifespanMultiplier: 2.0,
    corruptionResistBonus: +2,
    forceAwarenessBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.lifespan === "number") r.lifespan = current.lifespan * state.lifespanMultiplier;
      if (typeof current.corruptionResist === "number") r.corruptionResist = current.corruptionResist + state.corruptionResistBonus;
      if (typeof current.forceAwareness === "number") r.forceAwareness = current.forceAwareness + state.forceAwarenessBonus;
      return r;
    }
  }
};
