// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/10.js
'use strict';

/**
 * Room Script: The Ashen Balcony (ID: 10)
 * Handles:
 *  - Repairing the cracked bell
 *  - Dispelling the silencing runes
 *  - Ringing the bell (summons Ghoul + weakens Valerius)
 */

module.exports = {
  listeners: {

    // --- Ambient Bell Effects ---
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      if (Math.random() < 0.05) {
        room.broadcast("<italic>The massive bell sways slightly in the high-altitude wind, but produces no sound.</italic>");
      }
    },

    // --- Repair / Dispel / Ring Logic ---
    command: state => function (commandName, args, player) {
      const room = this;
      const target = args ? args.toLowerCase() : '';

      // --- REPAIR THE BELL ---
      if (commandName === 'repair' && target.includes('bell')) {
        const solder = player.inventory.find(i => i.id.includes('alchemical_solder'));

        if (!solder) {
          return player.say("The crack is too wide. You need some kind of alchemical solder or resin to fill it.");
        }

        player.say("<cyan>You carefully apply the alchemical solder to the crack. The bronze feels whole once more.</cyan>");
        room.setMeta('bell_repaired', true);

        solder.destroy();
        return true;
      }

      // --- DISPEL THE RUNES ---
      if ((commandName === 'dispel' || commandName === 'pray') && target.includes('runes')) {

        const dc = state.DCTables.getDC("spellcraft", [], "decipher_scroll") || 25;

        const spellcraft = player.getSkill('spellcraft') || 0;
        const religion   = player.getSkill('knowledge.religion') || 0;
        const skill = Math.max(spellcraft, religion);

        const roll = Math.floor(Math.random() * 20) + 1;
        const total = roll + skill;

        player.say(`<white>[ Spellcraft/Religion Check: ${roll} + ${skill} vs DC ${dc} ]</white>`);

        if (total >= dc) {
          player.say("<yellow>The silencing runes flare bright red and evaporate into steam!</yellow>");
          room.setMeta('runes_silenced', false);
        } else {
          player.say("<red>The runes resist your efforts, pulsing with a dull thrum that numbs your fingers.</red>");
        }

        return true;
      }

      // --- RING THE BELL ---
      if (commandName === 'ring' && target.includes('bell')) {

        if (!room.getMeta('bell_repaired')) {
          return player.say("You strike the bell, but it only produces a dull, dead thud because of the crack.");
        }

        if (room.getMeta('runes_silenced')) {
          return player.say("The bell swings, but the magical runes swallow the sound entirely.");
        }

        // --- SUCCESSFUL RING ---
        room.broadcast("\n<yellow><bold>BONG! BONG! BONG!</bold></yellow>");
        room.broadcast("<cyan>A massive sonic shockwave ripples through the Ossuary, shattering loose stone and bone-ash!</cyan>");

        // --- GHoul Chase Sequence ---
        const room9 = state.RoomManager.getRoom('ossuary:9');
        const room8 = state.RoomManager.getRoom('ossuary:8');

        const ghoul = [...room9.npcs].find(n => n.id.includes('ghoul'));

        if (ghoul) {
          room9.broadcast("<red>The deafening chime of the bell drives the Ghoul into a frenzy! It scrambles toward the stairs!</red>");

          // Move to Room 8
          setTimeout(() => {
            if (!ghoul.room || ghoul.room !== room9) return;
            ghoul.moveTo(room8);

            room8.broadcast("<red>A ghoul scrambles into the room, its claws sparking against the iron stairs as it climbs upward!</red>");

            // Move to Room 10
            setTimeout(() => {
              if (!ghoul.room || ghoul.room !== room8) return;
              ghoul.moveTo(room);

              room.broadcast("<red>The Ghoul bursts onto the balcony, eyes wide and bleeding from the ears from the sonic blast!</red>");

              const targetPlayer = [...room.players][0];
              if (targetPlayer) {
                ghoul.initiateCombat(targetPlayer);
              }

            }, 3000);

          }, 3000);
        }

        // --- Weaken Valerius (Global Flag) ---
        player.setMeta('valerius_sonically_weakened', true);
        player.say("<magenta>You feel a distant, ethereal crack—as if something vital in the depths of the sanctuary just broke.</magenta>");

        return true;
      }
    }
  }
};
