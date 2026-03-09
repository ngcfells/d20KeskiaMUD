'use strict';

/**
 * Effect: Hasted
 * Accelerated movement and reflexes enhance your speed and responsiveness.
 */
module.exports = {
  config: {
    name: "Hasted",
    description: "Accelerated movement and reflexes enhance your speed and responsiveness.",
    type: "condition",
    family: "hasted",
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
        return current + 2;
      },
      reflex(current) {
        return current + 2;
      },
      staminaRegen(current) {
        return current + 1;
      },
      initiative(current) {
        return current + 2;
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<green>Your movements accelerate with supernatural speed.</green>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The burst of speed fades.</cyan>");
    }
  }
};
