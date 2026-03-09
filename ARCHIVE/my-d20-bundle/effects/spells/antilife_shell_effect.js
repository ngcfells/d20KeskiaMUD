'use strict';

/**
 * Antimagic Suppression (Ray Effect)
 * ----------------------------------
 * Suppresses all magical gear and abilities on a specific target.
 */
module.exports = {
  config: {
    name: "Antimagic Suppression",
    description: "Your magical abilities and items are suppressed.",
    type: "spell_effect",
    family: "suppression",
    tier: 1,
    maxTier: 1,
    isMagical: true
  },
  state: {},
  listeners: {
    effectActivated() {
      const target = this.target;
      target.setMeta('isAntimagicSuppressed', true);
      
      // Target-specific notification
      target.say("<red>A cold, grey void settles over your soul. You can no longer feel the hum of your enchanted gear.</red>");
    },

    effectDeactivated() {
      const target = this.target;
      target.removeMeta('isAntimagicSuppressed');
      target.say("<cyan>The grey fog lifts from your mind; the heat of magic returns to your blood.</cyan>");
    },

    /**
     * Movement Interaction: If a suppressed character enters a Dead Magic zone, 
     * the effect might "lock" or behave differently, but for standard d20, 
     * the Ray simply persists until its duration ends regardless of movement.
     */
    preMove: state => function (moveRequest) {
        // Targeted suppression doesn't block movement or collapse on 'proximity'.
        // It simply travels with the target.
    },

    /**
     * Intercept casting attempts while suppressed
     */
    onCastAttempt: state => function (spell, result) {
      this.target.say("<red>The grey void within you swallows your incantation. You are severed from the weave.</red>");
      result.cancel = true;
    }
  }
};
