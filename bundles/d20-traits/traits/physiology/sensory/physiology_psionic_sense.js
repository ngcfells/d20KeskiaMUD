'use strict';

module.exports = {
  config: {
    name: "Physiology: Psionic Sense",
    description: "A sensory system based on psionic field perception.",
    type: "trait",
    family: "physiology_psionic_sense",
    unique: true,
    persists: true
  },

  state: {
    psiAwarenessBonus: +4,
    blindsightRangeBonus: +20
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.psiAwareness === "number") r.psiAwareness = current.psiAwareness + state.psiAwarenessBonus;
      if (typeof current.blindsightRange === "number") r.blindsightRange = current.blindsightRange + state.blindsightRangeBonus;
      return r;
    }
  }
};
