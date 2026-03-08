'use strict';

/**
 * Effect: Aether Exposure (Minor)
 * Mild exposure to unstable aether disrupts internal balance.
 */
module.exports = {
  config: {
    name: "Aether Exposure (Minor)",
    description: "Mild exposure to unstable aether disrupts internal balance.",
    type: "condition",
    family: "clockwork_aether_exposure",
    tier: 1,
    maxTier: 3,
    duration: 40000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: (c) => c - 1,
      staminaRegen: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Unstable aether disrupts your equilibrium.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The minor aether disturbance fades.</cyan>");
    }
  }
};
