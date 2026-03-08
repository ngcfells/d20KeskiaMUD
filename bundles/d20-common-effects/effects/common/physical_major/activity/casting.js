'use strict';

/**
 * Effect: Casting
 * You are in the middle of casting a spell or ritual.
 */
module.exports = {
  config: {
    name: "Casting",
    description: "You are casting a spell and must maintain concentration.",
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
      spellPower: +1,
      reflex: -2,
      evasion: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('casting_override', true);
      this.target.addTag?.('is_casting');
      this.target.say("<yellow>You begin casting a spell...</yellow>");
    },

    effectDeactivated() {
      this.target.setMeta('casting_override', false);
      this.target.removeTag?.('is_casting');
      this.target.say("<cyan>Your casting ends.</cyan>");
    },

    move() {
      this.target.say("You cannot move while casting!");
      return false;
    },

    damaged() {
      this.target.say("<red>Your spellcasting is disrupted!</red>");
      this.remove();
    }
  }
};
