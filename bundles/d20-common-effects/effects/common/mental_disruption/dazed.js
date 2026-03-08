'use strict';

module.exports = {
  config: {
    name: "Dazed",
    description: "A sharp disruption rattles your focus. Noticeable penalties to perception, will, and reaction time.",
    type: "condition",
    family: "mental_disruption",
    tier: 2,
    maxTier: 3,
    duration: 30000
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -3,
      will: -2,
      reflex: -2,
      intelligence: -2,
      skill: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<magenta>Your senses reel under a sudden mental shock.</magenta>");
    },

    effectDeactivated() {
      this.target.say("<cyan>Your thoughts steady.</cyan>");
    }
  }
};
