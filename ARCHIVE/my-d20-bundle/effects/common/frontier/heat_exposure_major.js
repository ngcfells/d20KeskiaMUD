'use strict';

/**
 * Effect: Heat Exposure (Major)
 * Significant overheating disrupts physical performance.
 */
module.exports = {
  config: {
    name: "Heat Exposure (Major)",
    description: "Significant overheating disrupts physical performance.",
    type: "condition",
    family: "frontier_heat_exposure",
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
      reflex: c => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>The heat severely disrupts your performance.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The major heat effects weaken.</cyan>");
    }
  }
};
