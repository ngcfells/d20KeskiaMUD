'use strict';

/**
 * Effect: Wasteland Sickness (Minor)
 * Mild environmental contamination disrupts stamina and clarity.
 */
module.exports = {
  config: {
    name: "Wasteland Sickness (Minor)",
    description: "Mild environmental contamination disrupts stamina and clarity.",
    type: "condition",
    family: "wasteland_sickness",
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
      this.target.say("<yellow>Harsh environmental exposure disrupts your stability.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The minor effects fade.</cyan>");
    }
  }
};
