// bundles/my-d20-bundle/areas/ossuary/scripts/rooms/26.js
'use strict';

/**
 * Room 26: The Inclined Descent
 * Hazards:
 *  - Slippery incline when moving down
 *  - Balance check (Dex or Acrobatics)
 *  - Synergy with stabilized_footing effect
 */

module.exports = {
  listeners: {
    command: state => function (commandName, args, player) {
      const room = this;
      const target = (args || '').toLowerCase();

      // Flavor: examining the bones / recesses
      if (['examine', 'inspect', 'study', 'search'].includes(commandName) &&
          (target.includes('bones') || target.includes('recess'))) {
        player.say("<yellow>You peer into the wall recesses. The bones are arranged in careful patterns, but some sets end abruptly—as if their owners slid to their deaths.</yellow>");
        return true;
      }

      // Movement down the incline
      if (commandName === 'down') {
        const hasStable = player.hasEffect('stabilized_footing');
        const dc = hasStable ? state.DCTables.universal.easy : state.DCTables.universal.moderate;

        const dex = player.getAttribute('dexterity') || 10;
        const dexMod = Math.floor((dex - 10) / 2);
        const acro = player.getSkill('acrobatics') || 0;

        const bonus = Math.max(dexMod, acro);
        const roll = Math.floor(Math.random() * 20) + 1;
        const total = roll + bonus;

        player.say("<yellow>You carefully begin your descent down the slick incline...</yellow>");
        player.say(`<white>[ Balance Check: ${roll} + ${bonus} vs DC ${dc} ]</white>`);

        if (total < dc) {
          player.say("<red>Your foot slips! You slide uncontrollably down the slope, slamming into the lower landing.</red>");
          player.mutateAttribute('health', -3);
        }

        // Let normal movement proceed
        return false;
      }
    },

    updateTick: state => function () {
      const room = this;
      if (room.players.size === 0) return;

      if (Math.random() < 0.05) {
        room.broadcast("<italic>Loose bones rattle softly in their wall niches as if reacting to your presence.</italic>");
      }
    }
  }
};
