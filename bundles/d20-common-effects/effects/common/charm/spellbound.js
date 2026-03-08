'use strict';

module.exports = {
  config: {
    name: "Spellbound",
    description: "Your thoughts are held in a powerful mental grip. Severe penalties to perception, will, and reasoning.",
    type: "condition",
    family: "enthrall",
    tier: 3,
    maxTier: 3,
    duration: 60000,
    sourceType: "arcane"
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -4,
      will: -4,
      skill: -3,
      intelligence: -2,
      reflex: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Your thoughts lock onto an overwhelming presence.</red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The mental grip finally releases.</cyan>");
    }
  }
};
