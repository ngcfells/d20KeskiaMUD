'use strict';

/**
 * Effect: Mutation Instability (Minor)
 * Mild instability affects altered physiology.
 */
module.exports = {
  config: {
    name: "Mutation Instability (Minor)",
    description: "Mild instability affects altered physiology.",
    type: "condition",
    family: "wasteland_mutation_instability",
    tier: 1,
    maxTier: 3,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: c => c - 1,
      constitution: c => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your altered physiology shows mild instability.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The minor instability fades.</cyan>");
    }
  }
};
