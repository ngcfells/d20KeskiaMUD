'use strict';

module.exports = {
  config: {
    name: "Dominated",
    description: "A commanding influence directs your actions. Noticeable penalties to will and reasoning.",
    type: "condition",
    family: "captivation",
    tier: 2,
    maxTier: 3,
    duration: 45000,
    sourceType: "arcane"
  },

  state: {},

  modifiers: {
    attributes: {
      will: -4,
      perception: -2,
      intelligence: -1,
      skill: -2
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>A commanding presence presses against your decision-making.</red>");
      this.target.setMeta('dominated_override', true);
    },

    effectDeactivated() {
      this.target.say("<cyan>The commanding influence recedes.</cyan>");
      this.target.setMeta('dominated_override', false);
    }
  }
};
