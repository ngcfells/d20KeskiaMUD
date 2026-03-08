'use strict';

/**
 * Effect: System Backlash
 * Feedback from a failed or overloaded system disrupts your stability.
 */
module.exports = {
  config: {
    name: "System Backlash",
    description: "Feedback from a failed or overloaded system disrupts your stability.",
    type: "condition",
    family: "tech_backlash",
    tier: 1,
    maxTier: 1,
    duration: 20000,
    unique: false,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: (c) => c - 2,
      reflex: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>System feedback disrupts your neural pathways.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The disruptive feedback fades.</cyan>");
    }
  }
};
