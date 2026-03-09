// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/13.js
'use strict';

/**
 * Room Script: The Priest's Pantry (ID: 13)
 * Handles:
 *  - Ambient rot and infestation effects
 *  - Harvesting pulsing grey mold
 *  - Searching the dire rat's nest
 *  - Dire rat aggression if disturbed
 */

module.exports = {
  listeners: {

    // --- Ambient Rot & Infestation ---
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      if (Math.random() < 0.08) {
        const effects = [
          "The pulsing mold on the wall lets out a soft, wet squelch.",
          "A translucent beetle skitters across a petrified grain sack, its shell clicking against the stone.",
          "The thick, black ichor dripping from the barrels slowly expands its pool on the floor.",
          "A faint, high-pitched chittering echoes from behind the slumped sacks."
        ];

        room.broadcast(`<italic>${effects[Math.floor(Math.random() * effects.length)]}</italic>`);
      }
    },

    // --- Player Entry Flavor ---
    playerEnter: state => function (player) {
      player.say("<magenta>The overwhelming stench of fermentation and decay hangs heavy in the stagnant air.</magenta>");
    },

    // --- Mold Harvesting & Nest Searching ---
    command: state => function (commandName, args, player) {
      const room = this;
      const target = args ? args.toLowerCase() : '';

      const rat = [...room.npcs].find(n => n.id.includes('dire_rat'));

      // --- 1. HARVESTING THE MOLD ---
      if (commandName === 'scrape' && target.includes('mold')) {
        player.say("<yellow>You scrape at the pulsing grey mold. It shudders under your touch, releasing a faint, sickly-sweet spore cloud.</yellow>");
        player.say("<cyan>You gather a sample of Grey Mold Spores.</cyan>");

        // Create mold item (if defined in items.yml)
        if (state.ItemFactory) {
          const mold = state.ItemFactory.create(room.area, 'ossuary:grey_mold_spores');
          if (mold) mold.moveTo(player);
        }

        return true;
      }

      // --- 2. SEARCHING THE NEST ---
      if (commandName === 'search' && target.includes('nest')) {

        // If rat is present and not friendly, it attacks
        if (rat && !rat.getMeta('is_friendly') && !rat.isInCombat()) {
          player.say("<red>The moment you reach toward the nest, the dire rat lunges with a protective screech!</red>");
          rat.initiateCombat(player);
          return true;
        }

        // Standard Search Check (DC 15)
        const dc = state.DCTables.getDC("search", ["generic"], "moderate") || 15;

        const intScore = player.getAttribute('intelligence') || 10;
        const intMod = Math.floor((intScore - 10) / 2);

        const searchSkill = player.getSkill('search') || intMod;

        const roll = Math.floor(Math.random() * 20) + 1;
        const total = roll + searchSkill;

        player.say("<yellow>You sift through the foul-smelling debris of the rat's nest...</yellow>");
        player.say(`<white>[ Search Check: ${roll} + ${searchSkill} vs DC ${dc} ]</white>`);

        // --- SUCCESS ---
        if (total >= dc) {

          if (!player.getMeta('searched_pantry_nest')) {
            player.say("<cyan>Hidden beneath the gnawed bone and filth, you find a Silver Signet Ring and a scrap of Alchemical Solder!</cyan>");

            // Create items
            const ring = state.ItemFactory.create(room.area, 'ossuary:silver_signet_ring');
            const solder = state.ItemFactory.create(room.area, 'ossuary:alchemical_solder');

            if (ring) ring.moveTo(player);
            if (solder) solder.moveTo(player);

            player.setMeta('searched_pantry_nest', true);
          } else {
            player.say("You find nothing else of value in the foul pile.");
          }

          return true;
        }

        // --- FAILURE ---
        player.say("<red>You sift through the filth but find nothing. A jagged bone scratches your hand.</red>");

        // 30% chance of Filth Fever
        if (Math.random() < 0.3) {
          player.say("<magenta>The scratch begins to throb with a strange, feverish heat.</magenta>");

          if (state.EffectFactory.has('filth_fever')) {
            const fever = state.EffectFactory.create('filth_fever', {});
            player.addEffect(fever);
          }
        }

        return true;
      }
    }
  }
};
