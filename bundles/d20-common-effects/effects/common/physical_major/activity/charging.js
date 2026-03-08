'use strict';

/**
 * Effect: Charging
 * You commit to a forward rush, gaining momentum but lowering defenses.
 */
module.exports = {
  config: {
    name: "Charging",
    description: "You commit to a forward rush, gaining momentum but lowering defenses.",
    type: "condition",
    family: "physical_major_activity",
    tier: 1,
    maxTier: 1,
    duration: 6000, // short-lived stance
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      attackMelee: +2,
      speed: +1,
      evasion: -2,
      reflex: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.setMeta('charging_override', true);
      this.target.addTag?.('is_charging');
      this.target.say("<red>You lower your stance and charge forward!</red>");
    },

    effectDeactivated() {
      this.target.setMeta('charging_override', false);
      this.target.removeTag?.('is_charging');
      this.target.say("<cyan>Your charge ends.</cyan>");
    },

    damaged() {
      this.target.say("<red>Your charge falters!</red>");
      this.remove();
    }
  }
};
