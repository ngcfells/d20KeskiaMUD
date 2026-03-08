'use strict';

module.exports = {
  config: {
    name: "Physiology: Elemental Sense",
    description: "A sensory system attuned to elemental resonance.",
    type: "trait",
    family: "physiology_elemental_sense",
    unique: true,
    persists: true
  },

  state: {
    elementalAwarenessBonus: +3,
    perceptionBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.elementalAwareness === "number") r.elementalAwareness = current.elementalAwareness + state.elementalAwarenessBonus;
      if (typeof current.perception === "number") r.perception = current.perception + state.perceptionBonus;
      return r;
    }
  }
};
