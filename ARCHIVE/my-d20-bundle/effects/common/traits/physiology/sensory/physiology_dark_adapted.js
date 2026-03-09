'use strict';

module.exports = {
  config: {
    name: "Physiology: Dark Adapted",
    description: "A sensory system optimized for deep subterranean darkness.",
    type: "trait",
    family: "physiology_dark_adapted",
    unique: true,
    persists: true
  },

  state: {
    darkvisionBonus: +30,
    tremorsenseBonus: +10
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.darkvision === "number") r.darkvision = current.darkvision + state.darkvisionBonus;
      if (typeof current.tremorsense === "number") r.tremorsense = current.tremorsense + state.tremorsenseBonus;
      return r;
    }
  }
};
