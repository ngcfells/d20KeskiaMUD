'use strict';

/**
 * Effect: Regenerating (Minor, Tier 1)
 * A mild regenerative effect accelerates natural healing.
 */
module.exports = {
  config: {
    name: "Regenerating (Minor)",
    description: "A mild regenerative effect accelerates natural healing.",
    type: "condition",
    family: "regenerating",
    tier: 1,
    maxTier: 3,
    duration: 30000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      healthRegen: (current) => current + 1,
      staminaRegen: (current) => current + 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<green>Your body begins to heal more quickly.</green>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The minor regeneration fades.</cyan>");
    }
  }
};
