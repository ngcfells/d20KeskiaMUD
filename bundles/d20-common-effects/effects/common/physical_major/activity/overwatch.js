'use strict';

/**
 * Effect: Overwatch
 * You prepare to react to enemy movement or actions.
 */
module.exports = {
  config: {
    name: "Overwatch",
    description: "You prepare to react to enemy movement or actions.",
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
      perception: +2,
      reflex: +2,
      attackRanged: +1
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('overwatch_override', true);
      this.target.addTag?.('is_on_overwatch');
      this.target.say("<cyan>You enter overwatch, ready to react.</cyan>");
    },

    effectDeactivated() {
      this.target.setMeta('overwatch_override', false);
      this.target.removeTag?.('is_on_overwatch');
      this.target.say("<yellow>You lower your guard.</yellow>");
    },

    move() {
      this.target.say("You stop overwatch as you move.");
      this.remove();
      return true;
    }
  }
};
