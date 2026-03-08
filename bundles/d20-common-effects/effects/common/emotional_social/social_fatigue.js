'use strict';

/**
 * Effect: Social Fatigue
 * Reduced social bandwidth limits clarity and responsiveness.
 */
module.exports = {
  config: {
    name: "Social Fatigue",
    description: "Reduced social bandwidth limits clarity and responsiveness.",
    type: "condition",
    family: "emotional_social_fatigue",
    tier: 1,
    maxTier: 1,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: c => c - 1,
      will: c => c - 1,
      reflex: c => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your social clarity diminishes.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your clarity returns.</cyan>");
    }
  }
};
