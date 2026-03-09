'use strict';

/**
 * Effect: Regenerating (Major, Tier 2)
 * A strong regenerative effect rapidly restores vitality.
 */
module.exports = {
  config: {
    name: "Regenerating (Major)",
    description: "A strong regenerative effect rapidly restores vitality.",
    type: "condition",
    family: "regenerating",
    tier: 2,
    maxTier: 3,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      healthRegen: (current) => current + 3,
      staminaRegen: (current) => current + 2,
      constitution: (current) => current + 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<green>A surge of regenerative energy flows through you.</green>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The major regeneration subsides.</cyan>");
    }
  }
};
