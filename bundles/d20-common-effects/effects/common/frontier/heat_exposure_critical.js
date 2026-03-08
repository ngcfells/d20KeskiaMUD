'use strict';

/**
 * Effect: Heat Exposure (Critical)
 * Severe overheating threatens systemic stability.
 */
module.exports = {
  config: {
    name: "Heat Exposure (Critical)",
    description: "Severe overheating threatens systemic stability.",
    type: "condition",
    family: "frontier_heat_exposure",
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
      this.target.say("<red><b>Severe heat threatens your stability!</b></red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The critical heat effects recede.</cyan>");
    }
  }
};
