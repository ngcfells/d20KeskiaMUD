'use strict';

module.exports = {
  config: {
    name: "Physiology: Fast Aging",
    description: "A physiology with accelerated aging and early decline.",
    type: "trait",
    family: "physiology_fast_aging",
    unique: true,
    persists: true
  },

  state: {
    lifespanMultiplier: 0.5,
    physicalDeclineRate: +2,
    mentalDeclineRate: +1
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
