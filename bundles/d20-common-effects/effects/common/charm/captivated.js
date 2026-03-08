'use strict';

module.exports = {
  config: {
    name: "Captivated",
    description: "A subtle influence shapes your choices. Minor penalties to will and perception, with slight openness to direction.",
    type: "condition",
    family: "captivation",
    tier: 1,
    maxTier: 3,
    duration: 30000,
    sourceType: "arcane"
  },

  state: {},

  modifiers: {
    attributes: {
      will: -2,
      perception: -1,
      skill: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<magenta>A subtle pull nudges your decisions.</magenta>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your autonomy sharpens again.</cyan>");
    }
  }
};
