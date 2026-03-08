'use strict';

module.exports = {
  config: {
    name: "Disoriented",
    description: "Your thoughts scatter briefly. Minor penalties to perception, will, and reflexes.",
    type: "condition",
    family: "mental_disruption",
    tier: 1,
    maxTier: 3,
    duration: 20000
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -2,
      will: -1,
      reflex: -1,
      intelligence: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>A momentary haze clouds your thoughts.</yellow>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your clarity returns.</cyan>");
    }
  }
};
