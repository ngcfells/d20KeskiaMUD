'use strict';

/**
 * Effect: Insanity (Long-Term)
 * Prolonged cognitive degradation from sustained exposure to eldritch forces.
 */
module.exports = {
  config: {
    name: "Insanity (Long-Term)",
    description: "Prolonged cognitive degradation from sustained exposure to eldritch forces.",
    type: "condition",
    family: "eldritch_insanity",
    tier: 1,
    maxTier: 1,
    duration: 120000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: (c) => c - 3,
      will: (c) => c - 2,
      intelligence: (c) => c - 2,
      reflex: (c) => c - 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Your grasp on structured thought weakens.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>Your long-term cognitive clarity returns.</cyan>");
    }
  }
};
