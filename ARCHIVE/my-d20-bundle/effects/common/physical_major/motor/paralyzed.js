'use strict';

/**
 * Effect: Paralyzed
 * You cannot move or act. Total motor shutdown.
 */
module.exports = {
  config: {
    name: "Paralyzed",
    description: "Your body is completely immobilized.",
    type: "condition",
    family: "physical_major_motor",
    tier: 1,
    maxTier: 1,
    duration: 15000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      reflex: -10,
      dexterity: -10,
      evasion: -5,
      strength: -5
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;

      target.setMeta('paralyzed_override', true);
      target.addTag?.('is_paralyzed');

      target.say("<red>Your body locks up completely!</red>");
    },

    effectDeactivated() {
      const target = this.target;

      target.setMeta('paralyzed_override', false);
      target.removeTag?.('is_paralyzed');

      target.say("<cyan>You regain control of your body.</cyan>");
    }
  }
};
