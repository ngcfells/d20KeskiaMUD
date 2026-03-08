'use strict';

/**
 * Effect: Slowed
 * Your movements and reactions are reduced, limiting your speed and responsiveness.
 */
module.exports = {
  config: {
    name: "Slowed",
    description: "Your movements and reactions are reduced, limiting your speed and responsiveness.",
    type: "condition",
    family: "slowed",
    tier: 1,
    maxTier: 1,
    duration: 30000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      speed(current) {
        return current - 2;
      },
      reflex(current) {
        return current - 2;
      },
      staminaRegen(current) {
        return current - 1;
      },
      initiative(current) {
        return current - 2;
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your movements slow noticeably.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your normal speed returns.</cyan>");
    }
  }
};
