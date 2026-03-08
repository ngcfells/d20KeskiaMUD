'use strict';

/**
 * Effect: Confused
 * Disrupted cognition makes it difficult to focus or act with clarity.
 */
module.exports = {
  config: {
    name: "Confused",
    description: "Disrupted cognition makes it difficult to focus or act with clarity.",
    type: "condition",
    family: "confused",
    tier: 1,
    maxTier: 1,
    duration: 30000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception(current) {
        return current - 2;
      },
      will(current) {
        return current - 1;
      },
      reflex(current) {
        return current - 1;
      },
      intelligence(current) {
        return current - 1;
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your thoughts become difficult to organize.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your clarity of mind returns.</cyan>");
    }
  }
};
