'use strict';

/**
 * Effect: Focus
 * You concentrate intensely, improving accuracy and mental resilience.
 */
module.exports = {
  config: {
    name: "Focus",
    description: "You concentrate intensely, improving accuracy and mental resilience.",
    type: "condition",
    family: "physical_major_activity",
    tier: 1,
    maxTier: 1,
    duration: null,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      attack: +1,
      will: +2,
      perception: +1
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('focus_override', true);
      this.target.addTag?.('is_focusing');
      this.target.say("<green>You narrow your focus.</green>");
    },

    effectDeactivated() {
      this.target.setMeta('focus_override', false);
      this.target.removeTag?.('is_focusing');
      this.target.say("<cyan>Your focus relaxes.</cyan>");
    },

    move() {
      this.target.say("Movement breaks your focus.");
      this.remove();
      return true;
    },

    damaged() {
      this.target.say("<red>Your focus shatters!</red>");
      this.remove();
    }
  }
};
