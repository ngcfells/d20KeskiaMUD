'use strict';

/**
 * Effect: Dust Choke
 * Heavy airborne particulates obstruct breathing and reduce stamina.
 */
module.exports = {
  config: {
    name: "Dust Choke",
    description: "Heavy airborne particulates obstruct breathing and reduce stamina.",
    type: "condition",
    family: "frontier_dust_choke",
    tier: 1,
    maxTier: 1,
    duration: 30000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: (c) => c - 2,
      constitution: (c) => c - 1,
      perception: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Dust fills your airways, reducing your stamina.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your breathing clears.</cyan>");
    }
  }
};
