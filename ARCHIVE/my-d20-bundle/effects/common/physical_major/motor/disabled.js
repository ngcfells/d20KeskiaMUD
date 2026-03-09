'use strict';

/**
 * Effect: Disabled
 * You can barely move; severe penalties to mobility and combat effectiveness.
 */
module.exports = {
  config: {
    name: "Disabled",
    description: "Your body struggles to respond, limiting your ability to act.",
    type: "condition",
    family: "physical_major_motor",
    tier: 1,
    maxTier: 1,
    duration: 12000,
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      reflex: -3,
      dexterity: -2,
      strength: -2,
      speed: -1,
      attack: -2
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;

      target.setMeta('disabled_override', true);
      target.addTag?.('is_disabled');

      target.say("<magenta>Your limbs feel heavy and unresponsive.</magenta>");
    },

    effectDeactivated() {
      const target = this.target;

      target.setMeta('disabled_override', false);
      target.removeTag?.('is_disabled');

      target.say("<cyan>Your mobility improves.</cyan>");
    }
  }
};
