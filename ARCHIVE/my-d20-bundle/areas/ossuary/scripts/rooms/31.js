// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/31.js
'use strict';

/**
 * Room 31: The Chasm of the Unhallowed
 * Hazards:
 *  - Slick bridge (balance check)
 *  - Fall into river (heavy damage)
 *  - Rope usage for safety
 */

module.exports = {
  listeners: {

    command: state => function (commandName, args, player) {
      const room = this;

      // Crossing the bridge
      if (commandName === 'cross' || commandName === 'south') {
        const hasRope = player.inventory.find(i => i.id.includes('rope'));

        const dex = player.getAttribute('dexterity') || 10;
        const acro = player.getSkill('acrobatics') || 0;
        const mod = Math.max(Math.floor((dex - 10) / 2), acro);

        const dc = hasRope ? 10 : 15;
        const roll = Math.floor(Math.random() * 20) + 1;

        player.say("<yellow>You step onto the slick stone bridge...</yellow>");
        player.say(`<white>[ Balance Check: ${roll} + ${mod} vs DC ${dc} ]</white>`);

        if (roll + mod < dc) {
          player.say("<red>Your foot slips! You plunge into the roaring chasm below!</red>");
          player.mutateAttribute('health', -15);
        }

        return false;
      }
    },

    updateTick: state => function () {
      const room = this;
      if (room.players.size === 0) return;

      if (Math.random() < 0.05) {
        room.broadcast("<italic>Spray from the river below coats the bridge in a shimmering mist.</italic>");
      }
    }
  }
};
