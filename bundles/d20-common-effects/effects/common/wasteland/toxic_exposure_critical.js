'use strict';

/**
 * Effect: Toxic Exposure (Critical)
 * Severe toxin exposure threatens systemic stability.
 */
module.exports = {
  config: {
    name: "Toxic Exposure (Critical)",
    description: "Severe toxin exposure threatens systemic stability.",
    type: "condition",
    family: "wasteland_toxic_exposure",
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
      this.target.say("<red><b>Severe toxin exposure threatens your stability!</b></red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The critical toxic effects recede.</cyan>");
    }
  }
};
