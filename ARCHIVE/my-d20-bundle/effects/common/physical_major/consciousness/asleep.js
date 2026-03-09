'use strict';

/**
 * Effect: Asleep
 * You are unconscious but can be awakened by damage or loud stimuli.
 */
module.exports = {
  config: {
    name: "Asleep",
    description: "You are asleep and unaware of your surroundings.",
    type: "condition",
    family: "physical_major_consciousness",
    tier: 1,
    maxTier: 1,
    duration: 30000, // 30 seconds
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      perception: -10,
      reflex: -10,
      evasion: -5
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;

      target.setMeta('asleep_override', true);
      target.addTag?.('is_asleep');

      target.say("<yellow>You drift into unconscious sleep.</yellow>");
    },

    effectDeactivated() {
      const target = this.target;

      target.setMeta('asleep_override', false);
      target.removeTag?.('is_asleep');

      target.say("<cyan>You awaken.</cyan>");
    }
  }
};
