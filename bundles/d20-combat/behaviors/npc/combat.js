'use strict';

const Combat = require('../../lib/combat-manager');

module.exports = {
  listeners: {

    /**
     * NPC heartbeat: acquire targets and advance combat.
     */
    update: function (state) {
      const npc = this;

      if (!npc || !npc.room) {
        return;
      }

      // If already fighting, advance combat
      if (npc.isInCombat && npc.isInCombat()) {
        Combat.updateCombatRound(npc);
        return;
      }

      // Otherwise, look for a player to attack
      for (const [, player] of npc.room.players) {
        if (player.isNpc) continue;
        if (player.getMeta('isDead')) continue;

        Combat.startCombat(npc, player);
        break;
      }
    },

    /**
     * Cleanup on death.
     */
    death: function () {
      Combat.stopCombat(this);
    }
  }
};
