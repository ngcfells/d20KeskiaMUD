'use strict';

/**
 * Effect: Dehydration (Critical)
 * Severe dehydration threatens systemic stability.
 */
module.exports = {
  config: {
    name: "Dehydration (Critical)",
    description: "Severe dehydration threatens systemic stability.",
    type: "condition",
    family: "wasteland_dehydration",
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
      reflex: c => c - 2,
      maxHealth: c => c - 5
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>Severe dehydration threatens your stability!</b></red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your hydration gradually returns.</cyan>");
    }
  }
};
