'use strict';

module.exports = {
  config: {
    name: "Broken Will",
    description: "Your inner resolve collapses. Severe penalties to all mental defenses and awareness.",
    type: "condition",
    family: "despair",
    tier: 4,
    maxTier: 4,
    duration: 50000
  },

  state: {},

  modifiers: {
    attributes: {
      will: -6,
      skill: -4,
      perception: -4,
      reflex: -3,
      fortitude: -3,
      attack: -2
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<red>Your inner resolve collapses under an overwhelming weight.</red>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>Your thoughts slowly knit themselves back together.</cyan>");
    }
  }
};
