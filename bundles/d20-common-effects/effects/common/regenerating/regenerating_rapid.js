'use strict';

/**
 * Effect: Regenerating (Rapid, Tier 3)
 * A powerful regenerative effect restores health at an accelerated rate.
 */
module.exports = {
  config: {
    name: "Regenerating (Rapid)",
    description: "A powerful regenerative effect restores health at an accelerated rate.",
    type: "condition",
    family: "regenerating",
    tier: 3,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      healthRegen: (current) => current + 6,
      staminaRegen: (current) => current + 3,
      constitution: (current) => current + 2,
      maxHealth: (current) => current + 5
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<green><b>Your body rapidly knits itself back together.</b></green>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The rapid regeneration fades.</cyan>");
    }
  }
};
