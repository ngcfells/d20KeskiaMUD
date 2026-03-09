'use strict';

module.exports = {
  config: {
    name: "Physiology: Echolocation",
    description: "A sensory system based on reflected sound waves.",
    type: "trait",
    family: "physiology_echolocation",
    unique: true,
    persists: true
  },

  state: {
    blindsightRangeBonus: +30,
    perceptionBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.blindsightRange === "number") r.blindsightRange = current.blindsightRange + state.blindsightRangeBonus;
      if (typeof current.perception === "number") r.perception = current.perception + state.perceptionBonus;
      return r;
    }
  }
};
