'use strict';

/**
 * Effect: Infatuated
 * Heightened social focus reduces general situational awareness.
 */
module.exports = {
  config: {
    name: "Infatuated",
    description: "Heightened social focus reduces general situational awareness.",
    type: "condition",
    family: "emotional_social_infatuated",
    tier: 1,
    maxTier: 1,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: c => c - 2,
      will: c => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your attention shifts toward a specific presence.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your focus returns to normal.</cyan>");
    }
  }
};
