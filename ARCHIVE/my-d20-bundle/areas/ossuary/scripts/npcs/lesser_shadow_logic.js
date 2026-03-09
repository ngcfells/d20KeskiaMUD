// path: bundles\my-d20-bundle\areas\ossuary\scripts\npcs\lesser_shadow_logic.js

'use strict';

module.exports = {
  listeners: {
    hit: state => function (damage, target, attacker) {
      const npc = this;

      // Only fire when the shadow hits the player
      if (attacker !== npc) return;

      target.say("<blue>The shadow's touch feels like a splash of ice water.</blue>");
    },

    playerKilled: state => function (player) {
      const npc = this;

      // Message to the player
      player.say("The shadow vanishes into the floor, bored with your presence.");

      // Optional: actually remove the shadow from the room
      if (npc.room) {
        npc.room.removeNpc(npc);
      }
    }
  }
};
