// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/9.js
'use strict';

/**
 * Room Script: The Mortuary Washroom (ID: 9)
 * Handles:
 *  - Ambient horror effects
 *  - Ghoul Stench aura (Fortitude save → Sickened)
 */

module.exports = {
  listeners: {

    // --- Ambient Horror + Ghoul Stench ---
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      // --- 1. Ambient Horror Emotes (7%) ---
      if (Math.random() < 0.07) {
        const effects = [
          "The rusted hooks clink softly against one another with a cold, metallic ring.",
          "A drop of dark fluid falls from a hook, splashing into a drainage groove with a hollow plink.",
          "The chains above rattle briefly, as if something heavy just shifted its weight in the dark.",
          "A faint, wet scratching sound echoes from the drainage grooves beneath the slabs."
        ];

        room.broadcast(`<italic>${effects[Math.floor(Math.random() * effects.length)]}</italic>`);
      }

      // --- 2. Ghoul Stench Aura (3.5E) ---
      const ghoul = [...room.npcs].find(n => n.id.includes('ghoul'));
      if (!ghoul) return;

      for (const player of room.players) {

        // 10% chance per tick if not already sickened
        if (Math.random() < 0.1 && !player.hasEffect('sickened')) {

          const dc = state.DCTables.getDC("survival", ["post_apoc", "radiation"], "moderate") || 15;
          const fort = player.getAttribute('fortitude') || 0;

          const roll = Math.floor(Math.random() * 20) + 1;
          const total = roll + fort;

          player.say(`<white>[ Fortitude Save vs Ghoul Stench: ${roll} + ${fort} = ${total} vs DC ${dc} ]</white>`);

          if (total < dc) {
            player.say("\n<red>The overwhelming stench of carrion and old blood hits you. You feel nauseous!</red>");

            if (state.EffectFactory.has('sickened')) {
              const sickened = state.EffectFactory.create('sickened', {
                duration: 60000, // 1 minute
                name: 'Sickened',
                description: 'The stench of death hinders your focus. -2 to all rolls.'
              });

              player.addEffect(sickened);
            }
          }
        }
      }
    },

    // --- Entry Flavor ---
    playerEnter: state => function (player) {
      player.say("<magenta>The air is thick and humid, tasting of copper and rot. A prickle of primal fear crawls up your spine.</magenta>");
    }
  }
};
