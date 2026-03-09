'use strict';

const { Broadcast: B } = require('ranvier');
const { MIND } = require('../../../lib/combat/damage-types');

module.exports = {
  config: {
    name: "Mystical Glamer",
    description: "Inanimate objects appear alive and hostile.",
    type: "condition",
    family: "illusion",
    tier: 1,
    duration: 600000
  },

  listeners: {
    /**
     * Heartbeat: Hallucinated attacks occur during the duration.
     */
    updateTick() {
      const target = this.target;
      const state = this.gameState;

      if (Math.random() > 0.7) {
        B.sayAt(target, "<red>A nearby statue lunges at you with a stone sword!</red>");
        
        // Damage is "Phantasmal" but felt as real. 
        // We deal Mind damage to represent the psychological trauma.
        state.Damage.apply({
          amount: state.Dice.roll('1d6'),
          type: MIND,
          target: target,
          source: "Phantasmal Statue"
        });
      }
    },

    effectDeactivated() {
      this.target.say("<cyan>The statues return to their pedestals and the paintings go still. The nightmare has ended.</cyan>");
    }
  }
};
