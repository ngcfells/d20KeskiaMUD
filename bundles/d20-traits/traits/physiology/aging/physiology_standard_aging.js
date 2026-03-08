'use strict';

module.exports = {
  config: {
    name: "Physiology: Standard Aging",
    description: "A typical biological aging process with gradual decline over time.",
    type: "trait",
    family: "physiology_standard_aging",
    unique: true,
    persists: true
  },

  state: {
    lifespanMultiplier: 1.0,
    physicalDeclineRate: 1,
    mentalDeclineRate: 1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.lifespan === "number") r.lifespan = current.lifespan * state.lifespanMultiplier;
      if (typeof current.physicalDeclineRate === "number") r.physicalDeclineRate = current.physicalDeclineRate + state.physicalDeclineRate;
      if (typeof current.mentalDeclineRate === "number") r.mentalDeclineRate = current.mentalDeclineRate + state.mentalDeclineRate;
      return r;
    }
  }
};
