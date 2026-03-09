'use strict';

module.exports = {
  config: {
    name: "Anonymity Aura",
    description: "Your identity is obscured by a phantasmal blur in the memories of others.",
    type: "buff",
    family: "illusion",
    tier: 1,
    duration: 600000
  },

  listeners: {
    /**
     * MUD-specific Hook: When someone uses 'look' on the caster.
     * We don't change the description now, but we tag the looker.
     */
    onBeingLookedAt(looker) {
      if (!looker.hasTag(`interacted_${this.target.uuid}`)) {
        looker.addTag(`interacted_${this.target.uuid}`);
      }
    },

    /**
     * Mechanical Logic: 
     * If the target tries to recall this player later, we force a save.
     */
    onIdentifyAttempt(looker) {
        const state = this.gameState;
        const dc = state.SpellcastingManager.calculateSpellDC(this.target, 1);
        
        const savePassed = state.SpellcastingManager._savingThrow(state, looker, 'will', dc);
        
        if (!savePassed) {
            looker.say("<yellow>You try to picture the person you just spoke to, but their face is a shifting blur. Were they human? Tall? You simply can't remember.</yellow>");
            return false; // Blocks identification/description recall
        }
    },

    effectDeactivated() {
      this.target.say("<yellow>The veil of anonymity lifts. Your features once again leave a lasting impression.</yellow>");
    }
  }
};
