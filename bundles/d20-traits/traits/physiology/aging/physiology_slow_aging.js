'use strict';

module.exports = {
  config: {
    name: "Physiology: Slow Aging",
    description: "A physiology with greatly reduced aging speed and minimal decline.",
    type: "trait",
    family: "physiology_slow_aging",
    unique: true,
    persists: true
  },

  state: {
    lifespanMultiplier: 4.0,
    physicalDeclineRate: -1,
    mentalDeclineRate: 0
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
