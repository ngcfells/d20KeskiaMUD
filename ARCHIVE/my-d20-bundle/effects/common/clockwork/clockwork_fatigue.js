'use strict';

/**
 * Effect: Clockwork Fatigue
 * Mechanical components operate below optimal efficiency.
 */
module.exports = {
  config: {
    name: "Clockwork Fatigue",
    description: "Mechanical components operate below optimal efficiency.",
    type: "condition",
    family: "clockwork_fatigue",
    tier: 1,
    maxTier: 1,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      strength: (c) => c - 1,
      reflex: (c) => c - 1,
      staminaRegen: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your mechanical systems show signs of wear.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your mechanical efficiency returns.</cyan>");
    }
  }
};
