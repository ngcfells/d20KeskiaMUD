'use strict';

/**
 * Logic: Individualized Antimagic Field.
 * Suppresses all magical items, active spells, and abilities on the target.
 */
module.exports = {
  config: {
    name: "Antimagic Suppression",
    description: "Your magical abilities and items are suppressed.",
    type: "spell_effect",
    family: "suppression",
    tier: 1,
    maxTier: 1
  },
  state: {},
  listeners: {
    effectActivated() {
      const target = this.target;
      // Immediate flag for the engine to ignore magical bonuses
      target.setMeta('isAntimagicSuppressed', true);
    },

    effectDeactivated() {
      const target = this.target;
      target.removeMeta('isAntimagicSuppressed');
      target.say("<cyan>The grey fog lifting from your mind; the weave returns to your fingertips.</cyan>");
    },

    /**
     * Intercept casting attempts
     */
    onCastAttempt: state => function (spell, result) {
      this.target.say("<red>You gesture and speak the words, but the mana in your veins is inert. The ray's lingering void denies you.</red>");
      result.cancel = true;
    }
  }
};
