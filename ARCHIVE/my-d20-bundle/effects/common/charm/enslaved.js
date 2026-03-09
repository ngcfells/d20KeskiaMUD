'use strict';

module.exports = {
  config: {
    name: "Enslaved",
    description: "A powerful influence overrides your autonomy. Severe penalties to will, perception, and independent decision-making.",
    type: "condition",
    family: "captivation",
    tier: 3,
    maxTier: 3,
    duration: 60000,
    sourceType: "arcane"
  },

  state: {},

  modifiers: {
    attributes: {
      will: -6,
      perception: -4,
      intelligence: -2,
      skill: -3,
      reflex: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>A dominating force seizes control of your priorities.</red>");
      this.target.setMeta('enslaved_override', true);
    },

    effectDeactivated() {
      this.target.say("<cyan>Your autonomy slowly returns.</cyan>");
      this.target.setMeta('enslaved_override', false);
    }
  }
};
