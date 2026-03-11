'use strict';

const Combat = require('../../lib/combat-manager');

module.exports = {
  listeners: {

    /**
     * NPC heartbeat: acquire targets and advance combat.
     */
    update: function (state) {
      const npc = this;

      // Hard guard: no emitter or no room, bail.
      if (!npc || !npc.room) {
        return;
      }

      // If already fighting, advance combat.
      if (typeof npc.isInCombat === 'function' && npc.isInCombat()) {
        Combat.updateCombatRound(npc);
        return;
      }

      // Otherwise, look for a player to attack.
      if (!npc.room.players || !npc.room.players.size) {
        return;
      }

      for (const [, player] of npc.room.players) {
        if (!player || player.isNpc) {
          continue;
        }
        if (typeof player.getMeta === 'function' && player.getMeta('isDead')) {
          continue;
        }

        Combat.startCombat(npc, player);
        break;
      }
    },

    /**
     * Cleanup on death.
     */
    death: function () {
      Combat.stopCombat(this);
    },
  },
};
