'use strict';

/**
 * Effect: Adrenal Surge
 * A burst of enhanced physical output increases your combat readiness.
 */
module.exports = {
  config: {
    name: "Adrenal Surge",
    description: "A burst of enhanced physical output increases your combat readiness.",
    type: "condition",
    family: "supers_adrenal_surge",
    tier: 1,
    maxTier: 1,
    duration: 30000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      strength: (c) => c + 2,
      reflex: (c) => c + 1,
      staminaRegen: (c) => c + 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<green>Your physical output increases sharply.</green>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your output returns to normal levels.</cyan>");
    }
  }
};
