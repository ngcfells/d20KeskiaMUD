'use strict';

/**
 * Effect: Off Balance
 * You lose your footing briefly. Penalties to reflex, evasion, and accuracy.
 */
module.exports = {
  config: {
    name: "Off Balance",
    description: "Your footing slips, reducing your ability to react and defend.",
    type: "condition",
    family: "physical_major_posture",
    tier: 1,
    maxTier: 1,
    duration: 10000, // 10 seconds
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      reflex: -2,
      evasion: -1,
      attack: -1
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;

      target.setMeta('off_balance_override', true);
      target.addTag?.('is_off_balance');

      target.say("<magenta>Your footing slips, throwing you off balance.</magenta>");
    },

    effectDeactivated() {
      const target = this.target;

      target.setMeta('off_balance_override', false);
      target.removeTag?.('is_off_balance');

      target.say("<cyan>You regain your footing.</cyan>");
    }
  }
};
