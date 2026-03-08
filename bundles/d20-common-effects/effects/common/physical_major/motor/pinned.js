'use strict';

/**
 * Effect: Pinned
 * You are held in place and cannot move freely.
 */
module.exports = {
  config: {
    name: "Pinned",
    description: "You are held in place and cannot move freely.",
    type: "condition",
    family: "physical_major_motor",
    tier: 1,
    maxTier: 1,
    duration: 10000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      reflex: -4,
      dexterity: -3,
      evasion: -2,
      attack: -2
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;

      target.setMeta('pinned_override', true);
      target.addTag?.('is_pinned');

      target.say("<red>You are pinned and cannot move!</red>");
    },

    effectDeactivated() {
      const target = this.target;

      target.setMeta('pinned_override', false);
      target.removeTag?.('is_pinned');

      target.say("<cyan>You break free.</cyan>");
    }
  }
};
