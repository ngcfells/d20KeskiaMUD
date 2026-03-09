'use strict';

/**
 * Effect: Cyberpsychosis (Major)
 * Significant instability from cybernetic overload.
 */
module.exports = {
  config: {
    name: "Cyberpsychosis (Major)",
    description: "Significant instability from cybernetic overload.",
    type: "condition",
    family: "tech_cyberpsychosis",
    tier: 2,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      will: (c) => c - 2,
      perception: (c) => c - 2,
      intelligence: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Your cybernetic systems destabilize significantly.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The major instability weakens.</cyan>");
    }
  }
};
