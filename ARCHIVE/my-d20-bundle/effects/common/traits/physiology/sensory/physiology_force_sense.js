'use strict';

module.exports = {
  config: {
    name: "Physiology: Force Sense",
    description: "A sensory system attuned to disturbances in the Force.",
    type: "trait",
    family: "physiology_force_sense",
    unique: true,
    persists: true
  },

  state: {
    forceAwarenessBonus: +4,
    dangerSenseBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.forceAwareness === "number") r.forceAwareness = current.forceAwareness + state.forceAwarenessBonus;
      if (typeof current.dangerSense === "number") r.dangerSense = current.dangerSense + state.dangerSenseBonus;
      return r;
    }
  }
};
