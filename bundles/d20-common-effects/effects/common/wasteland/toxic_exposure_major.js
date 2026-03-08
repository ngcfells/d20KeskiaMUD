'use strict';

/**
 * Effect: Toxic Exposure (Major)
 * Significant toxin exposure disrupts vital processes.
 */
module.exports = {
  config: {
    name: "Toxic Exposure (Major)",
    description: "Significant toxin exposure disrupts vital processes.",
    type: "condition",
    family: "wasteland_toxic_exposure",
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
      this.target.say("<red>Toxic exposure disrupts your stability.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The major toxic effects weaken.</cyan>");
    }
  }
};
