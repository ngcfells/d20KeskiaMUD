'use strict';

/**
 * Effect: Degenerating (Minor, Tier 1)
 * A mild degenerative effect slows natural healing.
 */
module.exports = {
  config: {
    name: "Degenerating (Minor)",
    description: "A mild degenerative effect slows natural healing.",
    type: "condition",
    family: "degenerating",
    tier: 1,
    maxTier: 3,
    duration: 30000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      healthRegen(current) {
        return current - 1;
      },
      staminaRegen(current) {
        return current - 1;
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Your natural healing slows.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The minor degeneration fades.</cyan>");
    }
  }
};
