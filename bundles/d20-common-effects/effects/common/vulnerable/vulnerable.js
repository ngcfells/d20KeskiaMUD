'use strict';

/**
 * Effect: Vulnerable
 * You are more susceptible to incoming damage.
 */
module.exports = {
  config: {
    name: "Vulnerable",
    description: "You are more susceptible to incoming damage.",
    type: "condition",
    family: "vulnerable",
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
        return current + 0.15; // 15% more damage taken
      },
      reflex(current) {
        return current - 1;
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>You become more exposed to harm.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your defenses return to normal.</cyan>");
    }
  }
};
