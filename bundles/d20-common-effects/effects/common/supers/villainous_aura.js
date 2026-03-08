'use strict';

/**
 * Effect: Villainous Aura
 * A disruptive presence weakens nearby stability.
 */
module.exports = {
  config: {
    name: "Villainous Aura",
    description: "A disruptive presence weakens nearby stability.",
    type: "condition",
    family: "supers_villainous_aura",
    tier: 1,
    maxTier: 1,
    duration: 30000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      will: (c) => c - 1,
      reflex: (c) => c - 1,
      perception: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>A disruptive presence interferes with your stability.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The disruptive presence fades.</cyan>");
    }
  }
};
