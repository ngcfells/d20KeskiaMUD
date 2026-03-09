'use strict';

const Combat = require('../../lib/combat-manager');
const { Broadcast: B } = require('ranvier');

module.exports = {
  listeners: {

    /**
     * Player heartbeat: maintain combat loop.
     * Must use function() so Ranvier binds `this` to the player.
     */
    update: function () {
      const player = this;

      // Safety: ensure player exists and is hydrated
      if (!player || typeof player.isInCombat !== 'function') {
        return;
      }

      if (player.isInCombat()) {
        Combat.updateCombatRound(player);
      }
    },

    /**
     * When the player initiates combat via commands like "kill" or "attack",
     * the command itself calls Combat.startCombat().
     * This listener is only for cleanup.
     */
    death: function () {
      Combat.stopCombat(this);
    },

    /**
     * Optional: If you want players to auto‑retaliate when attacked,
     * uncomment this block. */
    
    attacked: function (attacker) {
        const player = this;
        if (!player.isInCombat()) {
            Combat.startCombat(player, attacker);
        }
    },
  }
};
