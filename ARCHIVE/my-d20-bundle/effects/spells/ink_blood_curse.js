'use strict';

/**
 * Ink-Blood Curse Effect
 * ----------------------
 * 1. Causes permanent Blindness.
 * 2. Deals 1 point of Constitution damage every 24 hours.
 * 3. Can only be removed by 'Remove Curse' or higher magic.
 */
module.exports = {
  config: {
    name: "Ink-Blood Curse",
    description: "Your blood has turned to magical ink, blinding you and draining your vitality.",
    type: "curse",
    family: "sickness",
    tier: 2, // Nauseous/Incapacitated range
    isMagical: true,
    persistsAcrossDeath: true
  },
  state: {
      casterId: null,
      dailyConDrain: 1
  },
  listeners: {
    effectActivated() {
      const target = this.target;
      const spellDef = target.gameState.SpellManager.get('liang_s_ink_blood');
      
      // Apply Blindness behavior
      target.addBehavior('blind');
      if (spellDef.emotes.inkBlinding) spellDef.emotes.inkBlinding(target);
    },

    /**
     * Daily Constitution Drain
     * Triggered by the MUD's daily heartbeat or long-rest event.
     */
    onDailyHeartbeat: state => function () {
        const target = this.target;
        const spellDef = state.SpellManager.get('liang_s_ink_blood');
        
        let currentCon = target.getAttribute('constitution');
        target.setAttribute('constitution', Math.max(1, currentCon - this.state.dailyConDrain));
        
        if (spellDef.emotes.conDrain) spellDef.emotes.conDrain(target);
        
        if (target.getAttribute('constitution') <= 1) {
            target.say("<red>Your heart gives a final, sluggish thump and stops, completely clogged by the ink.</red>");
            target.die(this.state.casterId);
        }
    },

    effectDeactivated() {
      const target = this.target;
      target.removeBehavior('blind');
      target.say("<cyan>The blackness clears from your vision and your veins fade back to their natural hue. The curse of Liang Chou has been lifted.</cyan>");
    }
  }
};
