// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/29.js
'use strict';

/**
 * Room 29: The Ossuary Drain
 * Hazards:
 *  - Water current pulling toward grate
 *  - Strength check to resist suction
 *  - Plaque reading (lore)
 */

module.exports = {
  listeners: {

    updateTick: state => function () {
      const room = this;
      if (room.players.size === 0) return;

      // Current tug
      if (Math.random() < 0.10) {
        for (const p of room.players) {
          const str = p.getAttribute('strength') || 10;
          const mod = Math.floor((str - 10) / 2);
          const roll = Math.floor(Math.random() * 20) + 1;
          const dc = 12;

          if (roll + mod < dc) {
            p.say("<red>The current tugs at your legs, pulling you toward the grate!</red>");
            p.mutateAttribute('stamina', -1);
          }
        }
      }

      if (Math.random() < 0.05) {
        room.broadcast("<italic>A deep sucking sound echoes from the grate, like the crypt itself is breathing.</italic>");
      }
    },

    command: state => function (commandName, args, player) {
      const target = (args || '').toLowerCase();

      // ------------------------------------------------------------
      // READ PLAQUES
      // ------------------------------------------------------------
      if (['read', 'examine', 'inspect'].includes(commandName) &&
          target.includes('plaque')) {

        player.say("<cyan>The plaques list names of the departed—pilgrims, acolytes, and penitents. Many names repeat across generations.</cyan>");
        return true;
      }

      // ------------------------------------------------------------
      // INTERACT WITH GRATE
      // ------------------------------------------------------------
      if (['pull', 'lift', 'open'].includes(commandName) &&
          target.includes('grate')) {

        const str = player.getAttribute('strength') || 10;
        const mod = Math.floor((str - 10) / 2);
        const roll = Math.floor(Math.random() * 20) + 1;
        const dc = 18;

        player.say("<yellow>You grip the iron grate and attempt to lift it...</yellow>");
        player.say(`<white>[ Strength Check: ${roll} + ${mod} vs DC ${dc} ]</white>`);

        if (roll + mod >= dc) {
          player.say("<green>The grate shifts slightly, but the mechanism is sealed from the other side.</green>");
        } else {
          player.say("<red>The grate refuses to budge. The current surges, nearly pulling you off balance.</red>");
        }

        return true;
      }
    }
  }
};
