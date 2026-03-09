'use strict';

/**
 * Memory Gap Effect
 * -----------------
 * Represents the permanent loss of specific recent memories.
 * Mechanically, this prevents the target from 'remembering' 
 * NPC names or specific room events that occurred prior to the cast.
 */
module.exports = {
  config: {
    name: "Mind-Edit",
    description: "A portion of your recent memory has been surgically removed.",
    type: "curse",
    family: "mental_disruption",
    tier: 1, // Disorientated
    isMagical: true,
    persistsAcrossDeath: true
  },
  state: {
      casterId: null,
      redactedSpan: '10 minutes'
  },
  listeners: {
    effectActivated() {
      const target = this.target;
      
      // In a MUD context, we flush the 'recent_activity' log for this player
      if (target.getMeta('recent_events')) {
          target.setMeta('recent_events', []);
      }
      
      // Disorient the target
      const disoriented = this.target.gameState.EffectFactory.create('disorientated', {
          config: { duration: 60000 } // 1 minute of mechanical confusion
      });
      target.addEffect(disoriented);
    },

    /**
     * If the player tries to 'recall' or use a 'journal' command 
     * for that time period, the engine denies it.
     */
    onMemoryRecall: state => function (recallData) {
        if (recallData.timeframe === 'recent') {
            this.target.say("<grey>You try to think back, but that part of your life is simply... gone. There is only a grey, humming silence.</grey>");
            recallData.cancel = true;
        }
    }
  }
};
