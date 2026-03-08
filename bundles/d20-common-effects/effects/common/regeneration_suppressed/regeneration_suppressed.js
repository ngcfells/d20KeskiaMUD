'use strict';

/**
 * Effect: Regeneration Suppressed
 * All regenerative effects are halted.
 */
module.exports = {
  config: {
    name: "Regeneration Suppressed",
    description: "All regenerative effects are halted.",
    type: "condition",
    family: "regeneration_suppressed",
    tier: 1,
    maxTier: 1,
    duration: 30000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      healthRegen(current) {
        return 0;
      },
      staminaRegen(current) {
        return Math.min(current, 0);
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Your regenerative abilities are suppressed.</red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your regenerative capacity returns.</cyan>");
    }
  }
};
