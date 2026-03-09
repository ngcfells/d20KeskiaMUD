'use strict';

/**
 * Effect: Hangover
 * Aftereffects of intoxication reduce clarity and stamina.
 */
module.exports = {
  config: {
    name: "Hangover",
    description: "Aftereffects of intoxication reduce clarity and stamina.",
    type: "condition",
    family: "frontier_hangover",
    tier: 1,
    maxTier: 1,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: c => c - 2,
      staminaRegen: c => c - 1,
      will: c => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Residual intoxication disrupts your clarity.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your clarity returns.</cyan>");
    }
  }
};
