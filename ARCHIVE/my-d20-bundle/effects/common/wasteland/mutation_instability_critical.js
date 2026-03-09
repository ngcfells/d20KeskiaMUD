'use strict';

/**
 * Effect: Mutation Instability (Critical)
 * Severe instability threatens altered physiology.
 */
module.exports = {
  config: {
    name: "Mutation Instability (Critical)",
    description: "Severe instability threatens altered physiology.",
    type: "condition",
    family: "wasteland_mutation_instability",
    tier: 3,
    maxTier: 3,
    duration: 90000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: c => c - 3,
      constitution: c => c - 3,
      staminaRegen: c => c - 2,
      maxHealth: c => c - 5
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
