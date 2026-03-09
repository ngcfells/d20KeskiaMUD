'use strict';

/**
 * Effect: Dehydration (Minor)
 * Mild dehydration reduces stamina and clarity.
 */
module.exports = {
  config: {
    name: "Dehydration (Minor)",
    description: "Mild dehydration reduces stamina and clarity.",
    type: "condition",
    family: "wasteland_dehydration",
    tier: 1,
    maxTier: 3,
    duration: 45000,
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
      this.target.say("<yellow>Lack of hydration disrupts your stamina.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your hydration stabilizes.</cyan>");
    }
  }
};
