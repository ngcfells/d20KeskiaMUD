'use strict';

/**
 * Effect: EMP Shock
 * Electromagnetic disruption interferes with your systems.
 */
module.exports = {
  config: {
    name: "EMP Shock",
    description: "Electromagnetic disruption interferes with your systems.",
    type: "condition",
    family: "tech_emp",
    tier: 1,
    maxTier: 1,
    duration: 25000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      reflex: (c) => c - 1,
      perception: (c) => c - 1,
      staminaRegen: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your systems flicker under electromagnetic interference.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The electromagnetic disruption clears.</cyan>");
    }
  }
};
