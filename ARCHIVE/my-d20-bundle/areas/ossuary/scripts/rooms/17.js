// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/17.js
'use strict';

/**
 * Room Script: The Chamber of Muted Prayers (ID: 17)
 * Handles:
 *  - Absolute silence (blocks verbal commands)
 *  - Spell failure for verbal‑component spells
 *  - Silent spider ambush with Reflex save
 */

module.exports = {
  listeners: {

    // ============================================================
    // 1. SILENCE LOGIC — BLOCK VERBAL COMMANDS
    // ============================================================
    command: state => function (commandName, args, player) {
      const room = this;

      const verbal = ['say', 'yell', 'shout', 'tell', 'chat', 'cast'];

      if (!verbal.includes(commandName)) return;

      // --- SPELL FAILURE (Verbal Component) ---
      if (commandName === 'cast') {
        player.say("<blue>You attempt to intone the words of power, but no sound escapes your lips. The spell fizzles.</blue>");
        return true; // block spell
      }

      // --- BLOCK ALL OTHER SPEECH ---
      player.say("<italic>You open your mouth to speak, but the absolute silence of the room swallows your voice instantly.</italic>");
      return true;
    },

    // ============================================================
    // 2. SPIDER AMBUSH ON ENTRY
    // ============================================================
    playerEnter: state => function (player) {
      const room = this;

      const spider = [...room.npcs].find(n => n.id.includes('spider'));

      if (!spider || spider.isInCombat()) return;

      // Reflex save vs silent ambush
      const dc = state.DCTables.getDC("reflex", ["ambush"], "hard") || 20;

      const reflex = player.getAttribute('reflex') || 0;
      const roll = Math.floor(Math.random() * 20) + 1;
      const total = roll + reflex;

      player.say("<magenta>The unnatural silence makes the hair on your neck stand up...</magenta>");
      player.say(`<white>[ Reflex Save: ${roll} + ${reflex} = ${total} vs DC ${dc} ]</white>`);

      // --- FAILURE: Flat‑Footed + Surprise Attack ---
      if (total < dc) {
        player.say("<red>A small monstrous spider drops silently from the ceiling! You are too slow to react to the soundless threat!</red>");

        if (state.EffectFactory.has('flat_footed')) {
          const ff = state.EffectFactory.create('flat_footed', {
            duration: 6000,
            name: "Flat-Footed"
          });
          player.addEffect(ff);
        }

        spider.initiateCombat(player);
        return;
      }

      // --- SUCCESS: Player Reacts in Time ---
      player.say("<cyan>You catch a glint of movement in the sphere's light and roll aside as a spider lunges from the shadows!</cyan>");
      spider.initiateCombat(player);
    }
  }
};
