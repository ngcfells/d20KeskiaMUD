'use strict';

/**
 * Effect: Radiation Sickness (Minor)
 * Low-level radiation exposure disrupts cellular stability.
 */
module.exports = {
  config: {
    name: "Radiation Sickness (Minor)",
    description: "Low-level radiation exposure disrupts cellular stability.",
    type: "condition",
    family: "tech_radiation_sickness",
    tier: 1,
    maxTier: 3,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      constitution: (c) => c - 1,
      staminaRegen: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Low-level radiation disrupts your system.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The minor radiation effects fade.</cyan>");
    }
  }
};
