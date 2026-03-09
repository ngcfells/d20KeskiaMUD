// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/33.js
'use strict';

/**
 * Room 33: The Moldy Crypt
 * Hazards:
 *  - Spore inhalation (sanity + health damage)
 *  - Mold harvesting
 */

module.exports = {
  listeners: {

    updateTick: state => function () {
      const room = this;
      if (room.players.size === 0) return;

      if (Math.random() < 0.10) {
        for (const p of room.players) {
          p.say("<magenta>The mold releases a cloud of spores. Your throat burns.</magenta>");
          p.mutateAttribute('health', -1);
          p.mutateAttribute('sanity', -1);
        }
      }
    },

    command: state => function (commandName, args, player) {
      const target = (args || '').toLowerCase();

      if (['harvest', 'collect', 'scrape'].includes(commandName) &&
          target.includes('mold')) {

        player.say("<yellow>You scrape a sample of the grey mold into a small pouch...</yellow>");

        const roll = Math.random();

        if (roll < 0.5) {
          player.say("<red>The mold releases a burst of spores! You cough violently.</red>");
          player.mutateAttribute('health', -2);
        } else {
          player.say("<green>You collect a viable mold sample.</green>");
          const sample = state.ItemFactory.create(player.room.area, 'ossuary:mold_sample');
          if (sample) sample.moveTo(player);
        }

        return true;
      }
    }
  }
};
