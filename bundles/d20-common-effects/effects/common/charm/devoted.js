'use strict';

module.exports = {
  config: {
    name: "Devoted",
    description: "A powerful influence shapes your priorities. Strong bonuses to charisma and appearance.",
    type: "condition",
    family: "charm",
    tier: 3,
    maxTier: 3,
    duration: 60000,
    sourceType: "arcane"
  },

  state: {},

  modifiers: {
    attributes: {
      charisma: +3,
      appearance: +3,
      will: -4,
      perception: -3,
      skill: +2
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>A compelling presence weighs heavily on your priorities.</red>");
    },

    effectDeactivated() {
      this.target.say("<cyan>The influence loosens its hold on your thoughts.</cyan>");
    }
  }
};
