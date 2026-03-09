'use strict';

module.exports = {
  config: {
    name: "Hopeless",
    description: "Your resolve falters. Severe penalties to will, perception, and defensive reactions.",
    type: "condition",
    family: "despair",
    tier: 3,
    maxTier: 4,
    duration: 40000
  },

  state: {},

  modifiers: {
    attributes: {
      will: -4,
      skill: -3,
      perception: -3,
      reflex: -2,
      fortitude: -2
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<red>Your resolve thins, leaving your reactions dulled.</red>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>A faint steadiness returns to your thoughts.</cyan>");
    }
  }
};
