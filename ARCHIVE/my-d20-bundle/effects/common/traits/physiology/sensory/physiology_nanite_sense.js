'use strict';

module.exports = {
  config: {
    name: "Physiology: Nanite Sense",
    description: "A sensory system based on distributed nanite perception.",
    type: "trait",
    family: "physiology_nanite_sense",
    unique: true,
    persists: true
  },

  state: {
    perceptionBonus: +2,
    distributedAwarenessBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.distributedAwareness === "number") r.distributedAwareness = current.distributedAwareness + state.distributedAwarenessBonus;
      if (typeof current.perception === "number") r.perception = current.perception + state.perceptionBonus;
      return r;
    }
  }
};
