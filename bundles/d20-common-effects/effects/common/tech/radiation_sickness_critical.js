'use strict';

/**
 * Effect: Radiation Sickness (Critical)
 * Severe radiation exposure threatens systemic collapse.
 */
module.exports = {
  config: {
    name: "Radiation Sickness (Critical)",
    description: "Severe radiation exposure threatens systemic collapse.",
    type: "condition",
    family: "tech_radiation_sickness",
    tier: 3,
    maxTier: 3,
    duration: 90000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      constitution: (c) => c - 3,
      staminaRegen: (c) => c - 3,
      perception: (c) => c - 2,
      maxHealth: (c) => c - 5
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>Severe radiation threatens your stability!</b></red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The critical radiation effects recede.</cyan>");
    }
  }
};
