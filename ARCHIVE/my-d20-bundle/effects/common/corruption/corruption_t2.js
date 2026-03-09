'use strict';

module.exports = {
  config: {
    name: "Corruption II",
    description: "A growing metaphysical stain erodes your inner strength.",
    type: "condition",
    family: "corruption",
    tier: 2,
    maxTier: 5,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      will: -2,
      perception: -2,
      sanity: (current) => current - 2,
      necroticResist: -1,
      shadowResist: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>A growing corruption stains your essence.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The corruption weakens.</cyan>");
    }
  }
};
