'use strict';

/**
 * Effect: Mutation Flux (Major)
 * Significant instability disrupts your altered physiology.
 */
module.exports = {
  config: {
    name: "Mutation Flux (Major)",
    description: "Significant instability disrupts your altered physiology.",
    type: "condition",
    family: "supers_mutation_flux",
    tier: 2,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      constitution: (c) => c - 2,
      perception: (c) => c - 2,
      staminaRegen: (c) => c - 1
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
