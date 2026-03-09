'use strict';

/**
 * Effect: Cold Exposure (Critical)
 * Severe cold threatens systemic stability.
 */
module.exports = {
  config: {
    name: "Cold Exposure (Critical)",
    description: "Severe cold threatens systemic stability.",
    type: "condition",
    family: "frontier_cold_exposure",
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
      reflex: c => c - 3,
      perception: c => c - 2,
      maxHealth: c => c - 5
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>Severe cold threatens your stability!</b></red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The critical cold effects recede.</cyan>");
    }
  }
};
