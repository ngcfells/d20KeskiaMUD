'use strict';

/**
 * Effect: Cold Exposure (Major)
 * Significant cold disrupts physical performance.
 */
module.exports = {
  config: {
    name: "Cold Exposure (Major)",
    description: "Significant cold disrupts physical performance.",
    type: "condition",
    family: "frontier_cold_exposure",
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
      reflex: c => c - 2,
      perception: c => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>The cold severely disrupts your coordination.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The major cold effects weaken.</cyan>");
    }
  }
};
