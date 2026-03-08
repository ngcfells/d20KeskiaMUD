'use strict';

/**
 * Effect: Dehydration (Major)
 * Significant dehydration disrupts physical performance.
 */
module.exports = {
  config: {
    name: "Dehydration (Major)",
    description: "Significant dehydration disrupts physical performance.",
    type: "condition",
    family: "wasteland_dehydration",
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
      this.target.say("<red>Dehydration disrupts your performance.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your hydration improves.</cyan>");
    }
  }
};
