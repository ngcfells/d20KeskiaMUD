'use strict';

module.exports = {
  config: {
    name: "Doubting",
    description: "A moment of hesitation clouds your judgment. Minor penalties to will and skill checks.",
    type: "condition",
    family: "despair",
    tier: 1,
    maxTier: 4,
    duration: 20000
  },

  state: {},

  modifiers: {
    attributes: {
      will: -1,
      skill: -1,
      perception: -1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<magenta>A brief uncertainty tugs at your thoughts.</magenta>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>Your focus realigns.</cyan>");
    }
  }
};
