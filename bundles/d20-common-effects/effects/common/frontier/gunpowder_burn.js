'use strict';

/**
 * Effect: Gunpowder Burn
 * Burning particulates cause localized damage and sensory disruption.
 */
module.exports = {
  config: {
    name: "Gunpowder Burn",
    description: "Burning particulates cause localized damage and sensory disruption.",
    type: "condition",
    family: "frontier_gunpowder_burn",
    tier: 1,
    maxTier: 1,
    duration: 25000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: c => c - 2,
      reflex: c => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Burning particulates disrupt your senses.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your senses recover.</cyan>");
    }
  }
};
