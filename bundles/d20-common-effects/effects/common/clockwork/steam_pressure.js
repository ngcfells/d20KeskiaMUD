'use strict';

/**
 * Effect: Steam Pressure
 * Increased internal pressure enhances output at the cost of stability.
 */
module.exports = {
  config: {
    name: "Steam Pressure",
    description: "Increased internal pressure enhances output at the cost of stability.",
    type: "condition",
    family: "clockwork_steam_pressure",
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
      staminaRegen: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Steam pressure builds, enhancing mechanical output.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The excess pressure vents safely.</cyan>");
    }
  }
};
