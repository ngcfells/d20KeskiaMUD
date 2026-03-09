'use strict';

/**
 * Effect: Aether Exposure (Major)
 * Significant aether instability disrupts vital processes.
 */
module.exports = {
  config: {
    name: "Aether Exposure (Major)",
    description: "Significant aether instability disrupts vital processes.",
    type: "condition",
    family: "clockwork_aether_exposure",
    tier: 2,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: (c) => c - 2,
      staminaRegen: (c) => c - 2,
      constitution: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Aetheric instability disrupts your internal systems.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The major aether disturbance weakens.</cyan>");
    }
  }
};
