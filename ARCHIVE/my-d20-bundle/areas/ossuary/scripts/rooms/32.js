// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/32.js
'use strict';

/**
 * Room 32: The Riverside Landing
 * Hazards:
 *  - Giant centipede ambush
 *  - Salvaging old mining gear
 */

module.exports = {
  listeners: {

    playerEnter: state => function (player) {
      const room = this;

      const existing = [...room.npcs].find(n => n.id.includes('centipede'));
      if (!existing) {
        const cent = state.MobManager.create(room.area, 'ossuary:giant_centipede');
        if (cent) {
          cent.moveTo(room);
          cent.initiateCombat(player);
          player.say("<red>A giant centipede bursts from the rotted gear pile!</red>");
        }
      }
    },

    command: state => function (commandName, args, player) {
      const target = (args || '').toLowerCase();

      if (['search', 'dig', 'rummage'].includes(commandName) &&
          target.includes('gear')) {

        player.say("<yellow>You sift through the rotted mining gear...</yellow>");

        const roll = Math.random();

        if (roll < 0.4) {
          player.say("<white>You find a length of half‑rotted rope—still usable.</white>");
          const rope = state.ItemFactory.create(player.room.area, 'ossuary:rope');
          if (rope) rope.moveTo(player);
        } else if (roll < 0.7) {
          player.say("<green>You find a rusted piton that might still hold weight.</green>");
          const piton = state.ItemFactory.create(player.room.area, 'ossuary:piton');
          if (piton) piton.moveTo(player);
        } else {
          player.say("<red>A centipede egg sac bursts! You recoil in disgust.</red>");
          player.mutateAttribute('sanity', -2);
        }

        return true;
      }
    }
  }
};
