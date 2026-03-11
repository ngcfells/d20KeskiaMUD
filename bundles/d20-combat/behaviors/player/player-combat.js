'use strict';

const Combat = require('../../lib/combat-manager');

module.exports = {
  /**
   * IMPORTANT:
   * This behavior MUST have a unique name so it does not override NPC combat.
   */
  name: 'player-combat',

  listeners: {

    /**
     * Player heartbeat: maintain combat loop.
     */
    update: function () {
      const player = this;

      if (!player || typeof player.isInCombat !== 'function') {
        return;
      }

      if (player.isInCombat()) {
        Combat.updateCombatRound(player);
      }
    },

    /**
     * Cleanup on death.
     */
    death: function () {
      Combat.stopCombat(this);
    },

    /**
     * Optional auto‑retaliation.
     * This is safe because ONLY players will load this behavior now.
     */
    attacked: function (attacker) {
      const player = this;
      if (!player.isInCombat()) {
        Combat.startCombat(player, attacker);
      }
    },
  }
};
