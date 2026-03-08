'use strict';

module.exports = {
  config: {
    name: "Physiology: Ooze Sense",
    description: "A sensory system based on chemical and osmotic gradients.",
    type: "trait",
    family: "physiology_ooze_sense",
    unique: true,
    persists: true
  },

  state: {
    chemicalAwarenessBonus: +4,
    blindsightRangeBonus: +10
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.chemicalAwareness === "number") r.chemicalAwareness = current.chemicalAwareness + state.chemicalAwarenessBonus;
      if (typeof current.blindsightRange === "number") r.blindsightRange = current.blindsightRange + state.blindsightRangeBonus;
      return r;
    }
  }
};
