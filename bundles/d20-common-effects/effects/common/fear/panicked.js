'use strict';

module.exports = {
  config: {
    name: "Panicked",
    description: "Overwhelming fear disrupts coordination. Severe penalties to combat and saving throws.",
    type: "condition",
    family: "fear",
    tier: 4,
    maxTier: 5,
    duration: 50000 // 50s
  },

  state: {},

  modifiers: {
    attributes: {
      attack: -4,
      skill: -4,
      fortitude: -3,
      reflex: -3,
      will: -4
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<red>Your thoughts scatter as fear surges sharply.</red>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>Your breathing steadies as the surge of fear ebbs.</cyan>");
    }
  }
};
