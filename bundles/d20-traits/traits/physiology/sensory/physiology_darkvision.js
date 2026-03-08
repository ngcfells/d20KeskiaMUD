'use strict';

module.exports = {
  config: {
    name: "Physiology: Darkvision",
    description: "A visual system capable of perceiving in low-light conditions.",
    type: "trait",
    family: "physiology_darkvision",
    unique: true,
    persists: true
  },

  state: {
    darkvisionRangeBonus: +30,
    perceptionBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.darkvisionRange === "number") r.darkvisionRange = current.darkvisionRange + state.darkvisionRangeBonus;
      if (typeof current.perception === "number") r.perception = current.perception + state.perceptionBonus;
      return r;
    }
  }
};
