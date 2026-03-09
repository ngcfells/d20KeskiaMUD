'use strict';

/**
 * Effect: Force Attunement (Tier 1)
 * You attune to the Force, heightening perception and will.
 */
module.exports = {
  config: {
    name: "Force Attunement",
    description: "You are attuned to the Force, heightening perception and will.",
    type: "condition",
    family: "force",
    tier: 1,
    maxTier: 4,
    duration: 30000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: +2,
      will: +2,
      forcePower: +1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<cyan>You feel the Force flowing through you.</cyan>");
    },

    effectDeactivated() {
      this.target.say("<yellow>Your Force attunement fades.</yellow>");
    }
  }
};
