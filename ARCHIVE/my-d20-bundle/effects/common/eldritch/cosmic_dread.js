'use strict';

/**
 * Effect: Cosmic Dread
 * Exposure to vast, incomprehensible forces disrupts your stability.
 */
module.exports = {
  config: {
    name: "Cosmic Dread",
    description: "Exposure to vast, incomprehensible forces disrupts your stability.",
    type: "condition",
    family: "eldritch_cosmic",
    tier: 1,
    maxTier: 1,
    duration: 40000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      will: (c) => c - 2,
      reflex: (c) => c - 1,
      perception: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>An overwhelming presence presses against your awareness.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The oppressive influence recedes.</cyan>");
    }
  }
};
