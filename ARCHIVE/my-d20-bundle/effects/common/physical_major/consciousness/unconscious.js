'use strict';

/**
 * Effect: Unconscious
 * You are fully unconscious and cannot act or perceive.
 */
module.exports = {
  config: {
    name: "Unconscious",
    description: "You are unconscious and unable to act or perceive.",
    type: "condition",
    family: "physical_major_consciousness",
    tier: 1,
    maxTier: 1,
    duration: 45000, // 45 seconds
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -999,
      reflex: -999,
      evasion: -999,
      dexterity: -10,
      strength: -10
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;

      target.setMeta('unconscious_override', true);
      target.addTag?.('is_unconscious');

      target.say("<red>You collapse into unconsciousness.</red>");
    },

    effectDeactivated() {
      const target = this.target;

      target.setMeta('unconscious_override', false);
      target.removeTag?.('is_unconscious');

      target.say("<cyan>You regain consciousness.</cyan>");
    }
  }
};
