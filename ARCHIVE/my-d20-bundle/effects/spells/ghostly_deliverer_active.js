'use strict';

/**
 * Ghostly Deliverer Effect (Caster Side)
 * --------------------------------------
 * Returns sacrificed HP when the spell ends, unless the hand was destroyed.
 */
module.exports = {
  config: {
    name: "Ghostly Deliverer Link",
    description: "Your life force is tethered to a spectral construct.",
    type: "condition",
    family: "necromancy",
    tier: 1,
    maxTier: 1
  },
  state: {
    handId: null,
    sacrificeAmount: 0,
    handDestroyed: false
  },
  listeners: {
    effectActivated() {
      // Listen for the hand's death to prevent HP return
      this.onHandDeath = (deadMob) => {
        if (deadMob.uuid === this.state.handId) {
          this.state.handDestroyed = true;
          this.target.say("<red>Your Ghostly Deliverer is shattered! The life force used to create it is lost.</red>");
        }
      };
      state.addHook('onMobDeath', this.onHandDeath);
    },

    effectDeactivated() {
      state.removeHook('onMobDeath', this.onHandDeath);
      
      // HP Return Logic
      if (!this.state.handDestroyed) {
        this.target.addAttribute('health', this.state.sacrificeAmount);
        this.target.say("<cyan>The ghostly hand dissolves, and your borrowed vitality returns to you.</cyan>");
      }
      
      // Cleanup hand if it still exists
      const hand = state.MobManager.getMobByUuid(this.state.handId);
      if (hand) {
        hand.destroy();
      }
    }
  }
};
