'use strict';

module.exports = {
  config: {
    name: "Entranced",
    description: "Your attention narrows toward a focal presence. Minor penalties to perception and will.",
    type: "condition",
    family: "enthrall",
    tier: 1,
    maxTier: 3,
    duration: 30000,
    sourceType: "arcane"
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -2,
      will: -1,
      skill: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<magenta>Your attention drifts toward a single point of focus.</magenta>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your awareness widens again.</cyan>");
    }
  }
};
