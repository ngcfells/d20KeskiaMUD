'use strict';

/**
 * Effect: Flat-Footed
 * You are caught off-guard and cannot react normally.
 * Penalties to evasion and reflex; cannot make attacks of opportunity.
 */
module.exports = {
  config: {
    name: "Flat-Footed",
    description: "You are caught off-guard and cannot react normally.",
    type: "condition",
    family: "physical_major_posture",
    tier: 1,
    maxTier: 1,
    duration: 6000, // 6 seconds, same as your original
    unique: true,
    persists: false
  },

  state: {},

  modifiers: {
    attributes: {
      evasion: -2,
      reflex: -2
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;

      // Your original meta flag (kept for compatibility)
      target.setMeta('is_flat_footed', true);

      // Canonical posture override flag
      target.setMeta('flat_footed_override', true);

      target.say("<red>You are caught flat-footed!</red>");
    },

    effectDeactivated() {
      const target = this.target;

      target.setMeta('is_flat_footed', false);
      target.setMeta('flat_footed_override', false);

      target.say("<cyan>You regain your footing and awareness.</cyan>");
    }
  }
};
