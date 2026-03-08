'use strict';

module.exports = {
  config: {
    name: "Elevated",
    description: "Your energy feels heightened. Minor bonuses to initiative and skill checks.",
    type: "condition",
    family: "affective",
    tier: 1,
    maxTier: 3,
    duration: 30000
  },

  state: {},

  modifiers: {
    attributes: {
      initiative: +1,
      skill: +1,
      will: -1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<yellow>A quickened spark runs through your thoughts.</yellow>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>Your pace settles.</cyan>");
    }
  }
};
