'use strict';

/**
 * Effect: Trance
 * Deep meditative state. Reduced physical awareness, increased mental clarity.
 */
module.exports = {
  config: {
    name: "Trance",
    description: "You enter a deep trance, heightening mental clarity while reducing physical awareness.",
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
      will: +2,
      perception: -2,
      reflex: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('trance_override', true);
      this.target.addTag?.('is_in_trance');
      this.target.say("<magenta>You slip into a deep, focused trance.</magenta>");
    },

    effectDeactivated() {
      this.target.setMeta('trance_override', false);
      this.target.removeTag?.('is_in_trance');
      this.target.say("<cyan>Your trance ends.</cyan>");
    },

    move() {
      this.target.say("Movement breaks your trance.");
      this.remove();
      return true;
    },

    damaged() {
      this.target.say("<red>Your trance shatters!</red>");
      this.remove();
    }
  }
};
