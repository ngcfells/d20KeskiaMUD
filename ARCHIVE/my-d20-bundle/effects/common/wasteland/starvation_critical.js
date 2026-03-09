'use strict';

/**
 * Effect: Starvation (Critical)
 * Severe caloric deficit threatens systemic stability.
 */
module.exports = {
  config: {
    name: "Starvation (Critical)",
    description: "Severe caloric deficit threatens systemic stability.",
    type: "condition",
    family: "wasteland_starvation",
    tier: 3,
    maxTier: 3,
    duration: 120000,
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
      this.target.say("<red><b>Severe lack of sustenance threatens your stability!</b></red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your strength slowly returns.</cyan>");
    }
  }
};
