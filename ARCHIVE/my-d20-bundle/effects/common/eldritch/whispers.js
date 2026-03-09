'use strict';

/**
 * Effect: Whispers
 * Subtle intrusive impressions disrupt your concentration.
 */
module.exports = {
  config: {
    name: "Whispers",
    description: "Subtle intrusive impressions disrupt your concentration.",
    type: "condition",
    family: "eldritch_whispers",
    tier: 1,
    maxTier: 1,
    duration: 30000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: (c) => c - 1,
      concentration: (c) => c - 2
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Unclear impressions brush against your thoughts.</yellow>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The intrusive impressions fade.</cyan>");
    }
  }
};
