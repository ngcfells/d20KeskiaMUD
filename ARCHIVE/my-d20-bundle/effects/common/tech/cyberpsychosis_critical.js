'use strict';

/**
 * Effect: Cyberpsychosis (Critical)
 * Severe instability from cybernetic overload.
 */
module.exports = {
  config: {
    name: "Cyberpsychosis (Critical)",
    description: "Severe instability from cybernetic overload.",
    type: "condition",
    family: "tech_cyberpsychosis",
    tier: 3,
    maxTier: 3,
    duration: 90000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      will: (c) => c - 3,
      perception: (c) => c - 3,
      intelligence: (c) => c - 2,
      reflex: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>Your cybernetic systems enter critical instability!</b></red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The critical instability recedes.</cyan>");
    }
  }
};
