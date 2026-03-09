'use strict';

/**
 * Effect: Starvation (Major)
 * Significant caloric deficit disrupts physical performance.
 */
module.exports = {
  config: {
    name: "Starvation (Major)",
    description: "Significant caloric deficit disrupts physical performance.",
    type: "condition",
    family: "wasteland_starvation",
    tier: 2,
    maxTier: 3,
    duration: 90000,
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
      this.target.say("<red>Lack of sustenance disrupts your performance.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your strength begins to return.</cyan>");
    }
  }
};
