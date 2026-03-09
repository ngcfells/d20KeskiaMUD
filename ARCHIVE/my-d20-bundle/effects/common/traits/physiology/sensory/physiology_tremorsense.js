'use strict';

module.exports = {
  config: {
    name: "Physiology: Tremorsense",
    description: "A sensory system that detects vibrations through surfaces.",
    type: "trait",
    family: "physiology_tremorsense",
    unique: true,
    persists: true
  },

  state: {
    tremorsenseRangeBonus: +60,
    stabilityBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.tremorsenseRange === "number") r.tremorsenseRange = current.tremorsenseRange + state.tremorsenseRangeBonus;
      if (typeof current.stability === "number") r.stability = current.stability + state.stabilityBonus;
      return r;
    }
  }
};
