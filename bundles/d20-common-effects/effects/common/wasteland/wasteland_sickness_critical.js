'use strict';

/**
 * Effect: Wasteland Sickness (Critical)
 * Severe environmental contamination threatens systemic stability.
 */
module.exports = {
  config: {
    name: "Wasteland Sickness (Critical)",
    description: "Severe environmental contamination threatens systemic stability.",
    type: "condition",
    family: "wasteland_sickness",
    tier: 3,
    maxTier: 3,
    duration: 90000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: c => c - 3,
      perception: c => c - 3,
      constitution: c => c - 2,
      maxHealth: c => c - 5
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>Severe environmental contamination threatens your stability!</b></red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The critical effects recede.</cyan>");
    }
  }
};
