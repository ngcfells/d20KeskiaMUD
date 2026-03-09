'use strict';

/**
 * Effect: Heat Exposure (Minor)
 * Mild overheating reduces stamina and clarity.
 */
module.exports = {
  config: {
    name: "Heat Exposure (Minor)",
    description: "Mild overheating reduces stamina and clarity.",
    type: "condition",
    family: "frontier_heat_exposure",
    tier: 1,
    maxTier: 3,
    duration: 40000,
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
      this.target.say("<yellow>The heat begins to impair your performance.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The mild heat effects fade.</cyan>");
    }
  }
};
