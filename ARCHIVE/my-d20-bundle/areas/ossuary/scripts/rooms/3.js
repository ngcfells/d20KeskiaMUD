// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/3.js
'use strict';

module.exports = {
  listeners: {

    command: state => function (commandName, args, player) {
      const room = this;
      if (!args) return false;

      const verb = commandName.toLowerCase();
      const target = args.toLowerCase();

      const senseVerbs = [
        'look','examine','touch','feel','smell','sniff','taste','listen','search','sense'
      ];
      if (!senseVerbs.includes(verb)) return false;

      const stars = {
        'neon-blue':   { genre: 'cyberpunk',  msg: 'Static dances across the mosaic, crackling in thin, electric threads.' },
        'chrome-white': { genre: 'scifi',     msg: 'A sterile shimmer ripples outward, cold and precise as a machine’s breath.' },
        'emerald':     { genre: 'star_wars',  msg: 'A slow current stirs beneath the surface, deliberate and steady.' },
        'crimson':     { genre: 'post_apoc',  msg: 'A faint warmth radiates outward, carrying the scent of scorched dust.' }
      };

      // --- Sensory Interactions ---
      const nouns = {
        mosaic: "A vast mosaic spreads across the floor, its star-patterns arranged with uncanny symmetry.",
        stars: "Each star tile glimmers with its own hue, as though lit from within.",
        tiles: "The tiles are cool to the touch, their surfaces etched with faint geometric lines.",
        dome: "The chamber\'s dome curves overhead, its inner surface painted with constellations long forgotten.",
        constellations: "The constellations twist in unfamiliar patterns, their shapes resisting easy interpretation."
      };

      // LISTEN
      if (verb === 'listen') {
        player.say("<white>A soft hum resonates beneath the mosaic, steady and unbroken.</white>");
        return true;
      }

      // SMELL
      if (verb === 'smell' || verb === 'sniff') {
        player.say("<white>The air carries a faint mineral scent, like stone warmed by distant starlight.</white>");
        return true;
      }

      // TASTE
      if (verb === 'taste') {
        player.say("<white>The air tastes clean, with a hint of ozone.</white>");
        return true;
      }

      // SEARCH — chance to find the sanctified sword
      if (verb === 'search') {
        const perception = player.getSkill?.('perception') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 18;

        if (!room.getMeta('sanctified_sword_found')) {
          player.say("<yellow>You search the mosaic, tracing the seams between the star-tiles...</yellow>");

          if (roll >= dc) {
            room.setMeta('sanctified_sword_found', true);
            player.say("<green>Your fingers catch on a loose tile. Beneath it lies a wrapped bundle.</green>");
            player.say("<cyan>You have found: Sanctified Short Sword (+1)</cyan>");

            const sword = state.ItemManager.create(room.area, 'ossuary:sanctified_short_sword');
            sword && sword.moveTo(player);
            return true;
          }
        }

        player.say("<white>You find no further hidden mechanisms among the tiles.</white>");
        return true;
      }

      // PSIONIC EMPATH HOOK
      if (verb === 'sense' && player.getMeta('is_psionic_empath') === true) {
        player.say("<magenta>A layered emotional residue clings to the mosaic — curiosity, intention, and something like anticipation.</magenta>");
        return true;
      }

      // FORCE‑SENSITIVE HOOK (FS‑2 threshold)
      if (player.getMeta('is_force_sensitive') === true && verb === 'examine') {
        player.say("<cyan>The Force gathers in faint spirals around the emerald star, as though attentive to its presence.</cyan>");
      }

      // STAR TOUCH LOGIC
      const starKey = Object.keys(stars).find(k => target.includes(k));
      if (verb === 'touch' && starKey) {
        const star = stars[starKey];

        player.say(`<white>Your hand presses against the ${starKey} star.</white>`);
        player.say(`<yellow>${star.msg}</yellow>`);

        // --- Intelligence Check: Ritual Decipher ---
        const dc = state.DCTables.getDC("occultism", ["cthulhu","occultism"], "ritual_decipher") || 30;
        const intScore = player.getAttribute('intelligence') || 10;
        const skillMod = Math.floor((intScore - 10) / 2);
        const roll = Math.floor(Math.random() * 20) + 1;
        const total = roll + skillMod;

        player.say(`<white>[ Intelligence Check: ${roll} + ${skillMod} vs DC ${dc} ]</white>`);

        if (total < dc) {
          player.say("<red>The star\'s deeper pattern remains closed, its meaning slipping beyond reach.</red>");
          return true;
        }

        // --- Star-Key Check ---
        const key = player.inventory.find(i =>
          i.getMeta('is_star_key') && i.getMeta('genre') === star.genre
        );

        // --- Pilgrim’s Eye Gem Logic ---
        const gem = player.inventory.find(i => i.id.includes('pilgrim_eye_gem'));
        const eyeState = gem ? (gem.getMeta('eye_state') || 'none') : 'none';

        const secretPaths = {
          cleansed: { area: 'celestial_reach', msg: 'Light gathers, forming a path of radiant geometry.' },
          cursed:   { area: 'the_abyss',       msg: 'Darkness coils inward, opening a void that swallows sound.' },
          poisoned: { area: 'plaguelands',     msg: 'Sickly hues seep outward, warping the mosaic\'s symmetry.' }
        };

        if (secretPaths[eyeState]) {
          player.say(`<magenta>The ${eyeState} gem reacts to the star-pattern.</magenta>`);
          player.say(`<yellow>${secretPaths[eyeState].msg}</yellow>`);
          return true;
        }

        if (key) {
          player.say("<magenta>The star-key resonates, and the mosaic\'s pattern shifts in response.</magenta>");
        } else {
          player.say("<white>The star glows briefly, but without a proper focus, the pattern fades.</white>");
        }

        return true;
      }

      // SENSORY INTERACTIONS FOR NOUNS
      const nounKey = Object.keys(nouns).find(k => target.includes(k));
      if (nounKey) {
        player.say(`<white>${nouns[nounKey]}</white>`);
        return true;
      }

      return false;
    }
  }
};
