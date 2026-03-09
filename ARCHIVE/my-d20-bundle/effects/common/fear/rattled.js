'use strict';

module.exports = {
  config: {
    name: "Rattled",
    description: "Your focus slips. Minor penalties to will and skill checks.",
    type: "condition",
    family: "fear",
    tier: 1,
    maxTier: 5,
    duration: 20000 // 20s
  },

  state: {},

  modifiers: {
    attributes: {
      will: -1,
      skill: -1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<magenta>A faint unease settles over you.</magenta>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>Your focus steadies.</cyan>");
    }
  }
};
