'use strict';

/**
 * Effect: Neural Lag
 * Cognitive delay caused by neural interface desynchronization.
 */
module.exports = {
  config: {
    name: "Neural Lag",
    description: "Cognitive delay caused by neural interface desynchronization.",
    type: "condition",
    family: "tech_neural_lag",
    tier: 1,
    maxTier: 1,
    duration: 30000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      reflex: (c) => c - 2,
      perception: (c) => c - 1,
      intelligence: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your neural responses slow from interface desync.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your neural timing stabilizes.</cyan>");
    }
  }
};
