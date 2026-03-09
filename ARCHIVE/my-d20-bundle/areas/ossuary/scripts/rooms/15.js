// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/15.js
'use strict';

/**
 * Room Script: The Western Terminus (ID: 15)
 * Handles:
 *  - Prying the pilgrim-eye gems
 *  - Knowledge check for "Ascent of the Silent"
 *  - Searching the carvings for a hidden pressure plate
 *  - Psionic attunement to reveal the secret exit
 */

module.exports = {
  listeners: {

    // --- COMMAND HANDLER ---
    command: state => function (commandName, args, player) {
      const room = this;
      const target = args ? args.toLowerCase() : '';

      // ============================================================
      // 1. PRY / BASH / EXTRACT THE PILGRIM EYE GEMS
      // ============================================================
      if (['pry', 'bash', 'extract'].includes(commandName) &&
          (target.includes('eye') || target.includes('gem'))) {

        if (room.getMeta('eyes_pried')) {
          return player.say("The sockets are already empty, leaving only jagged holes in the stone.");
        }

        const dc = 15;
        const roll = Math.floor(Math.random() * 20) + 1;

        // STR mod or Disable Device skill
        const strScore = player.getAttribute('strength') || 10;
        const strMod = Math.floor((strScore - 10) / 2);

        const disable = player.getSkill('disable_device') || 0;

        const bonus = Math.max(strMod, disable);

        player.say("\n<yellow>You begin to dig at the dark gems inlaid in the pilgrims' faces...</yellow>");
        player.say(`<white>[ Gem Extraction Check: ${roll} + ${bonus} vs DC ${dc} ]</white>`);

        // --- SUCCESS ---
        if (roll + bonus >= dc) {
          player.say("<green>Success! You wedge your tool behind the stones and pop two small gems out of the wall.</green>");

          const area = state.AreaManager.getArea('ossuary');

          const gem1 = state.ItemFactory.create(area, 'ossuary:pilgrim_eye_gem');
          const gem2 = state.ItemFactory.create(area, 'ossuary:pilgrim_eye_gem');

          if (gem1) gem1.moveTo(player);
          if (gem2) gem2.moveTo(player);

          player.say("<magenta>A cold, judgmental shiver runs down your spine as the pilgrims go blind.</magenta>");

          if (player.hasAttribute('corruption')) player.mutateAttribute('corruption', 1);
          if (player.hasAttribute('sanity')) player.mutateAttribute('sanity', -1);

          room.setMeta('eyes_pried', true);
        }

        // --- FAILURE ---
        else {
          if (commandName === 'bash') {
            player.say("<red>You strike the wall with brute force, but only succeed in shattering the gems into worthless dust.</red>");
            room.setMeta('eyes_pried', true);
          } else {
            player.say("<red>Your tool slips, scratching the stone deeply but failing to dislodge the gems.</red>");
          }
        }

        return true;
      }

      // ============================================================
      // 2. KNOWLEDGE CHECK — "ASCENT OF THE SILENT"
      // ============================================================
      if (['research', 'examine', 'study'].includes(commandName) &&
          target.includes('journey')) {

        const dc = state.DCTables.getDC("knowledge", ["religion"], "moderate") || 15;

        const intScore = player.getAttribute('intelligence') || 10;
        const intMod = Math.floor((intScore - 10) / 2);

        const religion = player.getSkill('knowledge.religion') || 0;
        const history  = player.getSkill('knowledge.history')  || 0;

        const skill = Math.max(religion, history, intMod);

        const roll = Math.floor(Math.random() * 20) + 1;
        const total = roll + skill;

        player.say("\n<yellow>You study the faded carvings, trying to recall your theological studies...</yellow>");
        player.say(`<white>[ Knowledge Check: ${roll} + ${skill} vs DC ${dc} ]</white>`);

        if (total >= dc) {
          player.say("\n<cyan>You recognize this scene. It is the 'Ascent of the Silent'—a ritual pilgrimage to the Great Belfry.</cyan>");
          player.say("<cyan>The Silent ones would climb the spiral stairs to be 'cleansed' by the vibrations of the bell.</cyan>");
          player.say("<cyan>It explains why the staircase in the next room is so heavily worn.</cyan>");

          if (!player.getMeta('learned_ascent_lore')) {
            player.mutateAttribute('resolve', 1);
            player.setMeta('learned_ascent_lore', true);
            player.say("<green>Your resolve is bolstered by this newfound understanding of the Ossuary's history.</green>");
          }
        } else {
          player.say("<red>The details of the pilgrimage remain elusive. You know it is a holy scene, but the specific rites escape you.</red>");
        }

        return true;
      }

      // ============================================================
      // 3. SEARCH THE WALL / CARVINGS FOR SECRET EXIT
      // ============================================================
      if (commandName === 'search' &&
          (target.includes('wall') || target.includes('carvings'))) {

        const dc = state.DCTables.getDC("search", ["generic"], "hard") || 20;

        const intScore = player.getAttribute('intelligence') || 10;
        const intMod = Math.floor((intScore - 10) / 2);

        const searchSkill = player.getSkill('search') || intMod;

        const hasFocus =
          player.equipment.get('held') &&
          player.equipment.get('held').id === 'ossuary:ancient_psionic_focus';

        const roll = Math.floor(Math.random() * 20) + 1;
        const total = roll + searchSkill + (hasFocus ? 5 : 0);

        player.say("<yellow>You begin to meticulously inspect the stone wall for hidden seams...</yellow>");
        player.say(`<white>[ Search Check: ${roll} + ${searchSkill}${hasFocus ? " + 5 (Psionic Focus)" : ""} vs DC ${dc} ]</white>`);

        if (total >= dc) {
          player.say("<cyan>Success! You find a hidden pressure plate behind the eye of a carved pilgrim.</cyan>");
          revealSecretExit(room, player);
        } else {
          player.say("<red>You find nothing but cold stone and mocking eyes.</red>");
        }

        return true;
      }

      // ============================================================
      // 4. PSIONIC ATTUNEMENT — AUTOMATIC SUCCESS
      // ============================================================
      if (commandName === 'attune' && target.includes('wall')) {

        const held = player.equipment.get('held');

        if (held && held.id === 'ossuary:ancient_psionic_focus') {
          player.say("\n<magenta>You channel your will through the violet shard. The stone wall resonates with a low hum, its surface becoming momentarily translucent.</magenta>");
          revealSecretExit(room, player);
        } else {
          player.say("You lack the mental focus or the proper conduit to attune with the stone.");
        }

        return true;
      }
    }
  }
};

/**
 * Helper: Reveal the secret exit to Room 11 (Trapped Confessional)
 */
function revealSecretExit(room, player) {

  // Already open?
  if (room.getExits().find(e => e.direction === 'west')) {
    return player.say("The passage is already open.");
  }

  player.say("<green>With a grinding sound, the stone wall slides backward, revealing a dark crawlspace to the west!</green>");

  room.addExit({
    direction: 'west',
    roomId: 'ossuary:11',
    inferred: false
  });

  // Auto-close after 5 minutes
  setTimeout(() => {
    room.removeExit('west');
    room.broadcast("<italic>The stone wall slides shut with a final, heavy thud.</italic>");
  }, 300000);
}
