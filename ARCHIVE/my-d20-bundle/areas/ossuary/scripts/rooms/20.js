// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/20.js
'use strict';

/**
 * Room Script: The Resonance Chamber (ID: 20)
 * Handles:
 *  - Tuning the five bronze resonance forks
 *  - Psionic focus bonus
 *  - Sanity damage on failure
 *  - Unlocking the eastern bronze plate when puzzle is solved
 */

module.exports = {
  listeners: {

    // ============================================================
    // 1. COMMAND HANDLER — PUZZLE INTERACTION
    // ============================================================
    command: state => function (commandName, args, player) {
      const room = this;
      const target = args ? args.toLowerCase() : '';

      // ------------------------------------------------------------
      // PUZZLE: STRIKE / TURN / ALIGN FORKS
      // ------------------------------------------------------------
      if (['strike', 'turn', 'align'].includes(commandName) &&
          target.includes('fork')) {

        const held = player.equipment.get('held');
        const hasFocus = held && held.id && held.id.includes('psionic_focus');

        // DC 15 — Universal Moderate
        const dc = state.DCTables.universal.moderate || 15;

        // Mental component: INT or WIS
        const intScore = player.getAttribute('intelligence') || 10;
        const wisScore = player.getAttribute('wisdom') || 10;

        const mentalMod = Math.max(
          Math.floor((intScore - 10) / 2),
          Math.floor((wisScore - 10) / 2)
        );

        // Physical component: STR or DEX
        const strScore = player.getAttribute('strength') || 10;
        const dexScore = player.getAttribute('dexterity') || 10;

        const physMod = Math.max(
          Math.floor((strScore - 10) / 2),
          Math.floor((dexScore - 10) / 2)
        );

        const roll = Math.floor(Math.random() * 20) + 1;
        const total = roll + mentalMod + physMod + (hasFocus ? 5 : 0);

        player.say("\n<yellow>You attempt to tune the massive bronze forks...</yellow>");
        player.say(`<white>[ Check: ${roll} + ${mentalMod}(Mental) + ${physMod}(Physical)${hasFocus ? " + 5(Focus)" : ""} vs DC ${dc} ]</white>`);

        // --- SUCCESS ---
        if (total >= dc) {
          let aligned = room.getMeta('forks_aligned') || 0;
          aligned++;
          room.setMeta('forks_aligned', aligned);

          player.say(`<cyan>The fork rings out with a pure, resonant tone. (${aligned}/5 Aligned)</cyan>`);

          // Puzzle complete
          if (aligned >= 5 && !room.getMeta('puzzle_solved')) {
            room.setMeta('puzzle_solved', true);

            player.say("<green>The bronze plate to the east shudders and liquefies, forming a shimmering portal!</green>");
            room.broadcastExcept(player, "<green>The bronze plate ripples and melts into a resonant gateway!</green>");
          }
        }

        // --- FAILURE ---
        else {
          player.say("<red>The fork emits a dissonant screech that rattles your teeth!</red>");

          if (player.hasAttribute('sanity')) {
            player.mutateAttribute('sanity', -2);
          }
        }

        return true;
      }

      // ------------------------------------------------------------
      // EXIT BLOCKER — EASTERN BRONZE PLATE
      // ------------------------------------------------------------
      if (commandName === 'east' && !room.getMeta('puzzle_solved')) {
        player.say("The solid bronze plate blocks your path. It vibrates with a rejection of your presence.");
        return true;
      }
    },

    // ============================================================
    // 2. AMBIENT HUM WHEN SOLVED
    // ============================================================
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      if (room.getMeta('puzzle_solved') && Math.random() < 0.05) {
        room.broadcast("<cyan>The bronze gate hums in perfect unison.</cyan>");
      }
    }
  }
};
