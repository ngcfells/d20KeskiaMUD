'use strict';

/**
 * Effect: Overclocked
 * Enhanced neural and cybernetic throughput at increased strain.
 */
module.exports = {
  config: {
    name: "Overclocked",
    description: "Enhanced neural and cybernetic throughput at increased strain.",
    type: "condition",
    family: "tech_overclocked",
    tier: 1,
    maxTier: 1,
    duration: 30000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      reflex: (c) => c + 2,
      intelligence: (c) => c + 1,
      staminaRegen: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<green>Your systems accelerate beyond normal limits.</green>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your systems return to normal throughput.</cyan>");
    }
  }
};
