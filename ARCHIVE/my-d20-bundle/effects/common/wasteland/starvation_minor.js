'use strict';

/**
 * Effect: Starvation (Minor)
 * Mild caloric deficit reduces stamina and clarity.
 */
module.exports = {
  config: {
    name: "Starvation (Minor)",
    description: "Mild caloric deficit reduces stamina and clarity.",
    type: "condition",
    family: "wasteland_starvation",
    tier: 1,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: c => c - 1,
      perception: c => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Lack of sustenance reduces your stamina.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your energy stabilizes.</cyan>");
    }
  }
};
