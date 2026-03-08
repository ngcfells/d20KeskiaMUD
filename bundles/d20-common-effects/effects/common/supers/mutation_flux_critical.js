'use strict';

/**
 * Effect: Mutation Flux (Critical)
 * Severe instability threatens your altered physiology.
 */
module.exports = {
  config: {
    name: "Mutation Flux (Critical)",
    description: "Severe instability threatens your altered physiology.",
    type: "condition",
    family: "supers_mutation_flux",
    tier: 3,
    maxTier: 3,
    duration: 90000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      constitution: (c) => c - 3,
      perception: (c) => c - 3,
      staminaRegen: (c) => c - 2,
      maxHealth: (c) => c - 5
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>Your physiology enters critical instability!</b></red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The critical instability recedes.</cyan>");
    }
  }
};
