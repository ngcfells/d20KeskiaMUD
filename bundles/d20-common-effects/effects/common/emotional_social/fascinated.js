'use strict';

/**
 * Effect: Fascinated
 * Your attention narrows toward a specific stimulus, reducing awareness of surroundings.
 */
module.exports = {
  config: {
    name: "Fascinated",
    description: "Your attention narrows toward a specific stimulus, reducing awareness of surroundings.",
    type: "condition",
    family: "emotional_social_fascinated",
    tier: 1,
    maxTier: 1,
    duration: 30000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: c => c - 2,
      reflex: c => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your attention narrows toward a single point.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your awareness broadens again.</cyan>");
    }
  }
};
