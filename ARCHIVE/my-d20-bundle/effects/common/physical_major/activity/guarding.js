'use strict';

/**
 * Effect: Guarding
 * You adopt a defensive stance, improving your ability to avoid attacks.
 */
module.exports = {
  config: {
    name: "Guarding",
    description: "You adopt a defensive stance, improving your ability to avoid attacks.",
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
      evasion: +2,
      reflex: +1,
      armorKinetic: (current) => current + 1
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('guarding_override', true);
      this.target.addTag?.('is_guarding');
      this.target.say("<cyan>You raise your guard.</cyan>");
    },

    effectDeactivated() {
      this.target.setMeta('guarding_override', false);
      this.target.removeTag?.('is_guarding');
      this.target.say("<yellow>You lower your guard.</yellow>");
    },

    move() {
      this.target.say("You stop guarding as you move.");
      this.remove();
      return true;
    }
  }
};
