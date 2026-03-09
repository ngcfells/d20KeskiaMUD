'use strict';

/**
 * Effect: Mutation Instability (Major)
 * Significant instability disrupts altered physiology.
 */
module.exports = {
  config: {
    name: "Mutation Instability (Major)",
    description: "Significant instability disrupts altered physiology.",
    type: "condition",
    family: "wasteland_mutation_instability",
    tier: 2,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: c => c - 2,
      constitution: c => c - 2,
      staminaRegen: c => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Your physiology destabilizes significantly.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The major instability weakens.</cyan>");
    }
  }
};
