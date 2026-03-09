'use strict';

/**
 * Effect: Madness (Short-Term)
 * Brief cognitive disruption caused by exposure to incomprehensible forces.
 */
module.exports = {
  config: {
    name: "Madness (Short-Term)",
    description: "Brief cognitive disruption caused by exposure to incomprehensible forces.",
    type: "condition",
    family: "eldritch_madness",
    tier: 1,
    maxTier: 1,
    duration: 30000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: (c) => c - 2,
      will: (c) => c - 1,
      intelligence: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your thoughts distort under an unfamiliar influence.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your mind stabilizes.</cyan>");
    }
  }
};
