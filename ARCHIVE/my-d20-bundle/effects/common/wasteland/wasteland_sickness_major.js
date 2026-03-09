'use strict';

/**
 * Effect: Wasteland Sickness (Major)
 * Significant environmental contamination disrupts vital processes.
 */
module.exports = {
  config: {
    name: "Wasteland Sickness (Major)",
    description: "Significant environmental contamination disrupts vital processes.",
    type: "condition",
    family: "wasteland_sickness",
    tier: 2,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: c => c - 2,
      perception: c => c - 2,
      constitution: c => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>The environment severely disrupts your stability.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The major effects weaken.</cyan>");
    }
  }
};
