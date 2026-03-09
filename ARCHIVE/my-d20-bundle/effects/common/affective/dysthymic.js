'use strict';

module.exports = {
  config: {
    name: "Dysthymic",
    description: "Your energy feels muted. Minor penalties to stamina recovery and perception.",
    type: "condition",
    family: "affective",
    tier: 1,
    maxTier: 3,
    duration: 30000
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: -1,
      perception: -1,
      will: -1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<magenta>A muted heaviness settles over your awareness.</magenta>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>Your energy steadies.</cyan>");
    }
  }
};
