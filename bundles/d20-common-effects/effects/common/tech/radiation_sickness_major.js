'use strict';

/**
 * Effect: Radiation Sickness (Major)
 * Significant radiation exposure disrupts vital processes.
 */
module.exports = {
  config: {
    name: "Radiation Sickness (Major)",
    description: "Significant radiation exposure disrupts vital processes.",
    type: "condition",
    family: "tech_radiation_sickness",
    tier: 2,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      constitution: (c) => c - 2,
      staminaRegen: (c) => c - 2,
      perception: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Radiation disrupts your vital systems.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The major radiation effects weaken.</cyan>");
    }
  }
};
