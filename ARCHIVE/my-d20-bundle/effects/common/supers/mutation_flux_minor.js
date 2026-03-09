'use strict';

/**
 * Effect: Mutation Flux (Minor)
 * Mild instability affects your altered physiology.
 */
module.exports = {
  config: {
    name: "Mutation Flux (Minor)",
    description: "Mild instability affects your altered physiology.",
    type: "condition",
    family: "supers_mutation_flux",
    tier: 1,
    maxTier: 3,
    duration: 40000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      constitution: (c) => c - 1,
      perception: (c) => c - 1
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
