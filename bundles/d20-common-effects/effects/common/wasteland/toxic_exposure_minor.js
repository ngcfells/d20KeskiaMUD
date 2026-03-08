'use strict';

/**
 * Effect: Toxic Exposure (Minor)
 * Mild toxin exposure disrupts stamina and clarity.
 */
module.exports = {
  config: {
    name: "Toxic Exposure (Minor)",
    description: "Mild toxin exposure disrupts stamina and clarity.",
    type: "condition",
    family: "wasteland_toxic_exposure",
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
      this.target.say("<yellow>Toxic particulates disrupt your system.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The minor toxic effects fade.</cyan>");
    }
  }
};
