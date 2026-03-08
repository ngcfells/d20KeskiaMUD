'use strict';

/**
 * Effect: Poisoned (Severe, Tier 3)
 * A severe toxin ravages your system and threatens your stability.
 */
module.exports = {
  config: {
    name: "Poisoned (Severe)",
    description: "A severe toxin ravages your system and threatens your stability.",
    type: "condition",
    family: "poisoned",
    tier: 3,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: -3,
      constitution: (current) => current - 3,
      reflex: -3,
      strength: (current) => current - 2,
      maxHealth: (current) => current - 10,
      perception: -2
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red><b>A severe toxin ravages your body!</b></red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The severe poisoning weakens.</cyan>");
    }
  }
};
