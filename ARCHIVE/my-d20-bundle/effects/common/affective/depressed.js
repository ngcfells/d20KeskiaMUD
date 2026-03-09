'use strict';

module.exports = {
  config: {
    name: "Depressed",
    description: "Your energy and focus wane. Moderate penalties to stamina recovery, will, and perception.",
    type: "condition",
    family: "affective",
    tier: 2,
    maxTier: 3,
    duration: 45000
  },

  state: {},

  modifiers: {
    attributes: {
      staminaRegen: -2,
      perception: -2,
      will: -2,
      skill: -1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<magenta>A draining weight dulls your focus.</magenta>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>Your thoughts regain some clarity.</cyan>");
    }
  }
};
