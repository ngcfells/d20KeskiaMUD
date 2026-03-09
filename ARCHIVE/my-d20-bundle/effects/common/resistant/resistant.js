'use strict';

/**
 * Effect: Resistant
 * You are more resilient against incoming damage.
 */
module.exports = {
  config: {
    name: "Resistant",
    description: "You are more resilient against incoming damage.",
    type: "condition",
    family: "resistant",
    tier: 1,
    maxTier: 1,
    duration: 30000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      damageTakenMultiplier(current) {
        return current - 0.15; // 15% less damage taken
      },
      will(current) {
        return current + 1;
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<green>You brace yourself against harm.</green>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your resilience fades.</cyan>");
    }
  }
};
