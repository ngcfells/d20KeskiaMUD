'use strict';

/**
 * Effect: Petrified
 * Your body becomes rigid and immobile. You cannot act or perceive.
 */
module.exports = {
  config: {
    name: "Petrified",
    description: "Your body becomes rigid and immobile, unable to act or perceive.",
    type: "condition",
    family: "physical_major_transformation",
    tier: 1,
    maxTier: 1,
    duration: 60000, // 60 seconds
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -999,
      reflex: -999,
      evasion: -999,
      dexterity: -999,
      strength: -999,
      speed: -999
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;

      target.setMeta('petrified_override', true);
      target.addTag?.('is_petrified');

      target.say("<red>Your body hardens into an immobile state!</red>");
    },

    effectDeactivated() {
      const target = this.target;

      target.setMeta('petrified_override', false);
      target.removeTag?.('is_petrified');

      target.say("<cyan>Your body softens and movement returns.</cyan>");
    }
  }
};
