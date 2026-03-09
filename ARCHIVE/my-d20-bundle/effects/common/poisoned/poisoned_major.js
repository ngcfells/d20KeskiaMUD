'use strict';

/**
 * Effect: Poisoned (Major, Tier 2)
 * A potent toxin weakens your body and coordination.
 */
module.exports = {
  config: {
    name: "Poisoned (Major)",
    description: "A potent toxin weakens your body and coordination.",
    type: "condition",
    family: "poisoned",
    tier: 2,
    maxTier: 3,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: -2,
      constitution: (current) => current - 2,
      reflex: -2,
      strength: (current) => current - 1,
      maxHealth: (current) => current - 5
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>A potent toxin spreads through your body.</red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The major poisoning subsides.</cyan>");
    }
  }
};
