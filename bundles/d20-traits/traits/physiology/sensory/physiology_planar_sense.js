'use strict';

module.exports = {
  config: {
    name: "Physiology: Planar Sense",
    description: "A sensory system capable of detecting planar boundaries and energies.",
    type: "trait",
    family: "physiology_planar_sense",
    unique: true,
    persists: true
  },

  state: {
    planarAwarenessBonus: +4,
    perceptionBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.planarAwareness === "number") r.planarAwareness = current.planarAwareness + state.planarAwarenessBonus;
      if (typeof current.perception === "number") r.perception = current.perception + state.perceptionBonus;
      return r;
    }
  }
};
