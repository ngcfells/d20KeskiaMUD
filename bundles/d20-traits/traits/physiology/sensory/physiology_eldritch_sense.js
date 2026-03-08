'use strict';

module.exports = {
  config: {
    name: "Physiology: Eldritch Sense",
    description: "A sensory system attuned to non-Euclidean or entropic forces.",
    type: "trait",
    family: "physiology_eldritch_sense",
    unique: true,
    persists: true
  },

  state: {
    entropyAwarenessBonus: +4,
    blindsightRangeBonus: +30
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.entropyAwareness === "number") r.entropyAwareness = current.entropyAwareness + state.entropyAwarenessBonus;
      if (typeof current.blindsightRange === "number") r.blindsightRange = current.blindsightRange + state.blindsightRangeBonus;
      return r;
    }
  }
};
