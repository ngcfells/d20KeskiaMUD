// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/25.js
'use strict';

/**
 * Room Script: Eastern Loop Connector (ID: 25)
 * Handles:
 *  - Strength-based forcing/bending of the southern iron gate
 *  - Disable Device lockpicking
 */

module.exports = {
  listeners: {

    // ============================================================
    // 1. COMMAND HANDLER — GATE INTERACTIONS
    // ============================================================
    command: state => function (commandName, args, player) {
      const room = this;
      const target = args ? args.toLowerCase() : '';

      // Only respond to interactions with the gate/lock
      if (!target.includes('gate') && !target.includes('lock')) return;

      // Retrieve the SOUTH exit + door object
      const exit = room.getExits().find(e => e.direction === 'south');
      if (!exit) return player.say("There is no gate here.");

      const door = room.getDoor(exit);
      if (!door) return player.say("There is no gate here.");

      // ------------------------------------------------------------
      // STRENGTH LOGIC — BENDING / FORCING THE GATE
      // ------------------------------------------------------------
      if (['bend', 'force'].includes(commandName)) {

        if (!door.locked) {
          return player.say("The gate is already unlocked.");
        }

        const dc = state.DCTables.universal.extreme || 30;

        const strScore = player.getAttribute('strength') || 10;
        const strMod = Math.floor((strScore - 10) / 2);

        const roll = Math.floor(Math.random() * 20) + 1;
        const total = roll + strMod;

        player.say("<yellow>You attempt to heave the blackened iron bars apart...</yellow>");
        player.say(`<white>[ Strength Check: ${roll} + ${strMod} vs DC ${dc} ]</white>`);

        // --- SUCCESS ---
        if (total >= dc) {
          player.say("<green>With a mechanical snap, the lock housing shears off! The gate is forced open.</green>");
          room.unlockDoor(exit);
          room.openDoor(exit);
        }

        // --- FAILURE ---
        else {
          player.say("<red>The bars are cold and unyielding. Your muscles scream in protest.</red>");
          if (player.hasAttribute('stamina')) {
            player.mutateAttribute('stamina', -5);
          }
        }

        return true;
      }

      // ------------------------------------------------------------
      // DISABLE DEVICE — PICKING THE COMPLEX LOCK
      // ------------------------------------------------------------
      if (commandName === 'pick') {

        if (!door.locked) {
          return player.say("The gate is already unlocked.");
        }

        const dc = state.DCTables.getDC("disable_device", [], "hard") || 25;

        const skill = player.getSkill('disable_device') || 0;
        const roll = Math.floor(Math.random() * 20) + 1;
        const total = roll + skill;

        player.say("<yellow>You begin probing the complex tumblers of the iron gate...</yellow>");
        player.say(`<white>[ Disable Device: ${roll} + ${skill} vs DC ${dc} ]</white>`);

        // --- SUCCESS ---
        if (total >= dc) {
          player.say("<green>Click. The lock gives way to your skill.</green>");
          room.unlockDoor(exit);
        }

        // --- FAILURE ---
        else {
          player.say("<red>The intricate mechanism defies your tools.</red>");
        }

        return true;
      }
    }
  }
};
