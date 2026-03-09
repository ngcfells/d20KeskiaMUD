'use strict';

/**
 * Effect: Power Fatigue
 * Overuse of abilities reduces your efficiency.
 */
module.exports = {
  config: {
    name: "Power Fatigue",
    description: "Overuse of abilities reduces your efficiency.",
    type: "condition",
    family: "supers_power_fatigue",
    tier: 1,
    maxTier: 1,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: (c) => c - 2,
      reflex: (c) => c - 1,
      strength: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your abilities strain your endurance.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your endurance stabilizes.</cyan>");
    }
  }
};
