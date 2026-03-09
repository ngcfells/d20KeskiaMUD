'use strict';

/**
 * Effect: Cold Exposure (Minor)
 * Mild cold reduces stamina and coordination.
 */
module.exports = {
  config: {
    name: "Cold Exposure (Minor)",
    description: "Mild cold reduces stamina and coordination.",
    type: "condition",
    family: "frontier_cold_exposure",
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
      reflex: c => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>The cold begins to slow your movements.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The mild cold effects fade.</cyan>");
    }
  }
};
