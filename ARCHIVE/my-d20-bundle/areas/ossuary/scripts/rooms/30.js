// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/30.js
'use strict';

/**
 * Room 30: The Chamber of Drowned Hopes
 * Hazards:
 *  - Negative energy aura (sanity + health drain)
 *  - Wight aggression
 *  - Sarcophagus interaction (loot or curse)
 */

module.exports = {
  listeners: {

    updateTick: state => function () {
      const room = this;
      if (room.players.size === 0) return;

      // Negative energy pulse
      if (Math.random() < 0.10) {
        for (const p of room.players) {
          p.say("<magenta>A cold pressure squeezes your chest. Shadows cling to your skin.</magenta>");
          p.mutateAttribute('sanity', -1);
          p.mutateAttribute('health', -1);
        }
      }
    },

    command: state => function (commandName, args, player) {
      const room = this;
      const target = (args || '').toLowerCase();

      // ------------------------------------------------------------
      // OPEN SARCOPHAGUS
      // ------------------------------------------------------------
      if (['open', 'push', 'slide'].includes(commandName) &&
          target.includes('sarcophagus')) {

        player.say("<yellow>You push against the ornate sarcophagus lid...</yellow>");

        const roll = Math.random();

        if (roll < 0.4) {
          player.say("<red>A spectral hand bursts forth, clawing at your soul!</red>");
          player.mutateAttribute('sanity', -5);
        } else if (roll < 0.8) {
          player.say("<green>You find a small funerary charm inside.</green>");
          const charm = state.ItemFactory.create(room.area, 'ossuary:funerary_charm');
          if (charm) charm.moveTo(player);
        } else {
          player.say("<white>The sarcophagus is empty—its occupant long since risen.</white>");
        }

        return true;
      }
    }
  }
};
