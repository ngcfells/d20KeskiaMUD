// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/12.js
'use strict';

/**
 * Room Script: The Collapsed Ossuary Wall (ID: 12)
 * Handles:
 *  - Blocking movement until the player clears rubble
 *  - Strength-based "heave rubble"
 *  - Dexterity-based "scramble rubble"
 *  - Temporary Stabilized Footing effect
 *  - Ambient collapsing rubble effects
 */

module.exports = {
  listeners: {

    // --- Movement Interception ---
    command: state => function (commandName, args, player) {
      const room = this;

      // Movement directions we want to intercept
      const dirs = ['north', 'south', 'east', 'west', 'n', 's', 'e', 'w'];

      if (!dirs.includes(commandName)) return;

      // If the player already stabilized footing, allow movement
      if (player.hasEffect('stabilized_footing')) {
        return false; // allow movement
      }

      // Otherwise block movement
      player.say("<red>The shifting rubble and slick bones block your path.</red>");
      player.say("<yellow>You must <bold>heave rubble</bold> or <bold>scramble rubble</bold> to pass safely.</yellow>");
      return true;
    },

    // --- Heave / Scramble Logic ---
    action: state => function (actionName, args, player) {
      const room = this;
      const target = args ? args.toLowerCase() : '';

      if (!target.includes('rubble')) return;

      // Universal Moderate DC (15)
      const dc = state.DCTables.getDC("athletics", ["generic"], "moderate") || 15;
      const roll = Math.floor(Math.random() * 20) + 1;

      let mod = 0;
      let checkName = "";
      let success = false;

      // --- HEAVE (Strength) ---
      if (actionName === 'heave') {
        const strScore = player.getAttribute('strength') || 10;
        const strMod = Math.floor((strScore - 10) / 2);

        mod = strMod;
        checkName = "Strength";

        player.say("<yellow>You put your shoulder into the masonry, trying to brute-force a path...</yellow>");
        player.say(`<white>[ ${checkName} Check: ${roll} + ${strMod} vs DC ${dc} ]</white>`);

        if (roll + strMod >= dc) success = true;
      }

      // --- SCRAMBLE (Dexterity) ---
      else if (actionName === 'scramble') {
        const dexScore = player.getAttribute('dexterity') || 10;
        const dexMod = Math.floor((dexScore - 10) / 2);

        mod = dexMod;
        checkName = "Dexterity";

        player.say("<yellow>You attempt to light-foot your way across the sea of rolling femurs...</yellow>");
        player.say(`<white>[ ${checkName} Check: ${roll} + ${dexMod} vs DC ${dc} ]</white>`);

        if (roll + dexMod >= dc) success = true;
      }

      // --- SUCCESS ---
      if (success) {
        player.say("<cyan>Success! You find a temporary opening through the debris.</cyan>");

        // Apply Stabilized Footing effect (2 minutes)
        if (state.EffectFactory.has('stabilized_footing')) {
          const effect = state.EffectFactory.create('stabilized_footing', {
            duration: 120000,
            name: "Stabilized Footing"
          });
          player.addEffect(effect);
        }

        return true;
      }

      // --- FAILURE ---
      player.say("<red>The rubble shifts! You lose your balance and take minor bruising.</red>");
      player.mutateAttribute('health', -1);

      if (player.hasAttribute('stamina')) {
        player.mutateAttribute('stamina', -5);
      }

      return true;
    },

    // --- Ambient Rubble Effects ---
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      if (Math.random() < 0.05) {
        room.broadcast("<italic>A heavy stone slab settles with a grinding crunch, sending a cloud of bone dust into the air.</italic>");
      }
    }
  }
};
