'use strict';

/**
 * Effect: Cyberpsychosis (Minor)
 * Early-stage instability from cybernetic overload.
 */
module.exports = {
  config: {
    name: "Cyberpsychosis (Minor)",
    description: "Early-stage instability from cybernetic overload.",
    type: "condition",
    family: "tech_cyberpsychosis",
    tier: 1,
    maxTier: 3,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      will: (c) => c - 1,
      perception: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your cybernetic systems show early instability.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The instability subsides.</cyan>");
    }
  }
};
