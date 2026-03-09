// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/28.js
'use strict';

/**
 * Room 28: The Weeping Archway
 * Hazards:
 *  - Constant dripping (noise masking)
 *  - Gravelight fungus interactions
 *  - Zombie ambush on disturbance
 */

module.exports = {
  listeners: {

    playerEnter: state => function (player) {
      player.say("<blue>Cold droplets patter onto your shoulders as you step beneath the weeping archway.</blue>");
    },

    updateTick: state => function () {
      const room = this;
      if (room.players.size === 0) return;

      if (Math.random() < 0.05) {
        room.broadcast("<italic>Water drips rhythmically from the arch, echoing like distant sobs.</italic>");
      }
    },

    command: state => function (commandName, args, player) {
      const room = this;
      const target = (args || '').toLowerCase();

      // ------------------------------------------------------------
      // HARVEST GRAVELIGHT FUNGUS
      // ------------------------------------------------------------
      if (['harvest', 'collect', 'gather'].includes(commandName) &&
          target.includes('fungus')) {

        player.say("<yellow>You scrape a patch of glowing gravelight fungus from the archway...</yellow>");

        const roll = Math.random();

        if (roll < 0.3) {
          player.say("<red>The fungus releases a burst of spores! You cough violently.</red>");
          player.mutateAttribute('stamina', -3);
        } else {
          player.say("<green>You collect a small clump of gravelight fungus.</green>");
          const item = state.ItemFactory.create(room.area, 'ossuary:gravelight_fungus');
          if (item) item.moveTo(player);
        }

        return true;
      }

      // ------------------------------------------------------------
      // DISTURB WATER → ZOMBIE AMBUSH
      // ------------------------------------------------------------
      if (['splash', 'disturb', 'kick'].includes(commandName) &&
          target.includes('water')) {

        const existing = [...room.npcs].find(n => n.id.includes('zombie'));
        if (existing) {
          player.say("<red>Something already shambles in the water...</red>");
          return true;
        }

        player.say("<yellow>You churn the shallow water beneath the arch...</yellow>");

        const zombie = state.MobManager.create(room.area, 'ossuary:zombie_human');
        if (zombie) {
          zombie.moveTo(room);
          zombie.initiateCombat(player);
          room.broadcast("<red>A sodden corpse lurches upright, gravelight fungus clinging to its face!</red>");
        }

        return true;
      }
    }
  }
};
