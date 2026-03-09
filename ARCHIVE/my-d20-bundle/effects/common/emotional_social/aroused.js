'use strict';

/**
 * Effect: Aroused
 * Heightened physiological activation increases responsiveness and reduces filtering.
 */
module.exports = {
  config: {
    name: "Aroused",
    description: "Heightened physiological activation increases responsiveness and reduces filtering.",
    type: "condition",
    family: "emotional_social_aroused",
    tier: 1,
    maxTier: 1,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      reflex: c => c + 1,
      perception: c => c + 1,
      will: c => c - 1   // lowered inhibition / filtering
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your physiological activation increases.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your activation levels return to normal.</cyan>");
    }
  }
};
