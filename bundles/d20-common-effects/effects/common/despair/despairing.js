'use strict';

module.exports = {
  config: {
    name: "Despairing",
    description: "A heavy weight settles on your thoughts. Noticeable penalties to will, skills, and perception.",
    type: "condition",
    family: "despair",
    tier: 2,
    maxTier: 4,
    duration: 30000
  },

  state: {},

  modifiers: {
    attributes: {
      will: -2,
      skill: -2,
      perception: -2,
      reflex: -1
    }
  },

  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<magenta>A heavy stillness drags at your awareness.</magenta>");
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>The weight on your thoughts loosens.</cyan>");
    }
  }
};
