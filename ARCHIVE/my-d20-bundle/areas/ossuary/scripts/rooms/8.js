// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/8.js
'use strict';

/**
 * Room Script: The Belfry Access (ID: 8)
 * Handles:
 *  - Ambient grease/oil effects
 *  - Slip hazard when climbing the spiral staircase
 */

module.exports = {
  listeners: {

    // --- Ambient Oily Atmosphere ---
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      // 5% chance for ambient effects
      if (Math.random() < 0.05) {
        const emotes = [
          "A thick glob of black oil drips from a higher step, landing with a wet splut on the floor.",
          "The iron stairs groan under their own weight, echoing up into the lightless shaft.",
          "The pungent smell of old sulfur and grease flares up, stinging your nostrils."
        ];

        room.broadcast(`<italic>${emotes[Math.floor(Math.random() * emotes.length)]}</italic>`);
      }
    },

    // --- Slip Hazard: Intercept 'up' movement ---
    command: state => function (commandName, args, player) {
      if (commandName !== 'up' && commandName !== 'u') return;

      // DC for maintaining footing on slick metal
      const dc = state.DCTables.getDC("athletics", ["post_apoc", "scavenging"], "moderate") || 15;

      const reflex = player.getAttribute('reflex') || 0;
      const dexScore = player.getAttribute('dexterity') || 10;
      const dexMod = Math.floor((dexScore - 10) / 2);

      const roll = Math.floor(Math.random() * 20) + 1;
      const total = roll + reflex + dexMod;

      player.say("\n<yellow>You attempt to navigate the slick, oil‑coated spiral of the belfry stairs...</yellow>");
      player.say(`<white>[ Balance Check: ${roll} + ${reflex} + ${dexMod} vs DC ${dc} ]</white>`);

      if (total >= dc) {
        player.say("<cyan>You find purchase on the rusted iron and carefully haul yourself upward.</cyan>");
        return false; // allow movement
      }

      // --- Failure: Slip and fall ---
      player.say("<red>Your foot skids across a patch of thick grease! You tumble backward down the iron steps!</red>");

      const damage = Math.floor(Math.random() * 3) + 1;
      player.mutateAttribute('health', -damage);

      player.room.broadcastExcept(
        player,
        `<red>${player.name} slips on the greasy stair and crashes back down with a loud clang!</red>`
      );

      return true; // block movement
    }
  }
};
