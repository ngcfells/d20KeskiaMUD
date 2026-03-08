'use strict';

module.exports = {
  config: {
    name: "Corruption I",
    description: "A faint metaphysical taint weakens your spirit.",
    type: "condition",
    family: "corruption",
    tier: 1,
    maxTier: 5,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      will: -1,
      perception: -1,
      sanity: (current) => current - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>A faint corruption brushes against your spirit.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The faint corruption recedes.</cyan>");
    }
  }
};
