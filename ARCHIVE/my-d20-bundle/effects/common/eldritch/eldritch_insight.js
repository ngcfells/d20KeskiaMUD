'use strict';

/**
 * Effect: Eldritch Insight
 * Forbidden understanding sharpens awareness at the cost of stability.
 */
module.exports = {
  config: {
    name: "Eldritch Insight",
    description: "Forbidden understanding sharpens awareness at the cost of stability.",
    type: "condition",
    family: "eldritch_insight",
    tier: 1,
    maxTier: 1,
    duration: 45000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: (c) => c + 2,
      intelligence: (c) => c + 1,
      will: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<green>Unsettling clarity floods your thoughts.</green>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The unnatural clarity fades.</cyan>");
    }
  }
};
