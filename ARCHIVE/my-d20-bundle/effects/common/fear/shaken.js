'use strict';

module.exports = {
  config: {
    name: "Shaken",
    description: "Fear unsettles your nerves. Moderate penalties to attack, skills, and saving throws.",
    type: "condition",
    family: "fear",
    tier: 2,
    maxTier: 5,
    duration: 30000 // 30s
  },

  state: {},

  modifiers: {
    attributes: {
      attack: -2,
      skill: -2,
      fortitude: -1,
      reflex: -1,
      will: -2
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<magenta>A cold tension creeps along your spine.</magenta>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>Your nerves settle.</cyan>");
    }
  }
};
