'use strict';

/**
 * Effect: Poisoned (Minor, Tier 1)
 * A mild toxin disrupts your body.
 */
module.exports = {
  config: {
    name: "Poisoned (Minor)",
    description: "A mild toxin disrupts your body.",
    type: "condition",
    family: "poisoned",
    tier: 1,
    maxTier: 3,
    duration: 30000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: -1,
      constitution: (current) => current - 1,
      reflex: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>A mild toxin courses through your system.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The mild poisoning fades.</cyan>");
    }
  }
};
