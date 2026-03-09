'use strict';

/**
 * Effect: Aether Exposure (Critical)
 * Severe aether instability threatens structural integrity.
 */
module.exports = {
  config: {
    name: "Aether Exposure (Critical)",
    description: "Severe aether instability threatens structural integrity.",
    type: "condition",
    family: "clockwork_aether_exposure",
    tier: 3,
    maxTier: 3,
    duration: 90000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: (c) => c - 3,
      staminaRegen: (c) => c - 3,
      constitution: (c) => c - 2,
      maxHealth: (c) => c - 5
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>Severe aether instability threatens your structure!</b></red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The critical aether disturbance recedes.</cyan>");
    }
  }
};
