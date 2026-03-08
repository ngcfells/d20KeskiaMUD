'use strict';

module.exports = {
  config: {
    name: "Frightened",
    description: "Fear sharpens into alarm. Significant penalties to combat and saving throws.",
    type: "condition",
    family: "fear",
    tier: 3,
    maxTier: 5,
    duration: 40000 // 40s
  },

  state: {},

  modifiers: {
    attributes: {
      attack: -3,
      skill: -3,
      fortitude: -2,
      reflex: -2,
      will: -3
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<red>Your pulse quickens as unease sharpens into alarm.</red>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>Your breathing steadies as the alarm fades.</cyan>");
    }
  }
};
