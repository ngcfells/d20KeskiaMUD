// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/18.js
'use strict';

/**
 * Room Script: The Librarian’s Nook (ID: 18)
 * Handles:
 *  - Ambient scroll‑whispers
 *  - Searching floating scrolls for lore/spells
 *  - Digging/melting wax for hidden items
 *  - Random scroll‑grabbing with exhaustion limit
 */

module.exports = {
  listeners: {

    // ============================================================
    // 1. AMBIENT SCROLL WHISPERS
    // ============================================================
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      if (Math.random() < 0.05) {
        room.broadcast("<italic>A floating scroll brushes past your ear, whispering a syllable of a forgotten name.</italic>");
      }
    },

    // ============================================================
    // 2. COMMAND HANDLER
    // ============================================================
    command: state => function (commandName, args, player) {
      const room = this;
      const target = args ? args.toLowerCase() : '';

      // ------------------------------------------------------------
      // SEARCH SCROLLS — LORE / SPELLS / FRAGMENTS
      // ------------------------------------------------------------
      if (commandName === 'search' && target.includes('scroll')) {

        const dc = state.DCTables.getDC("spellcraft", [], "decipher_scroll") || 25;

        const spellcraft = player.getSkill('spellcraft') || 0;
        const religion   = player.getSkill('knowledge.religion') || 0;

        const skill = Math.max(spellcraft, religion);

        const roll = Math.floor(Math.random() * 20) + 1;
        const total = roll + skill;

        player.say("<yellow>You attempt to snatch a relevant scroll from the shifting magical currents...</yellow>");
        player.say(`<white>[ Scroll Search Check: ${roll} + ${skill} vs DC ${dc} ]</white>`);

        if (total >= dc) {
          const outcome = Math.random();

          // --- LORE: Black Liturgy ---
          if (outcome < 0.40) {
            player.say("<cyan>You capture a fragment of 'The Black Liturgy.' It describes how the Silent Ones used sonic resonance to bind spirits.</cyan>");
            player.setMeta('lore_sonic_binding', true);
          }

          // --- SPELL SCROLL: Lesser Restoration ---
          else if (outcome < 0.80) {
            player.say("<magenta>You find a preserved scroll of 'Lesser Restoration'! Its magic is still intact.</magenta>");

            const scroll = state.ItemFactory.create(room.area, 'ossuary:scroll_lesser_restoration');
            if (scroll) scroll.moveTo(player);
          }

          // --- ARCANE FORMULA (Spell Learning Hook) ---
          else {
            player.say("<white>The scroll contains a complex arcane formula. A dedicated student of magic could learn much from this.</white>");
            // Hook for spell‑learning system
          }
        }

        // --- FAILURE ---
        else {
          player.say("<red>The scrolls dodge your grasp, the magical static giving you a sharp shock.</red>");
          player.mutateAttribute('health', -1);
        }

        return true;
      }

      // ------------------------------------------------------------
      // DIG / MELT / BURN WAX — HIDDEN ITEMS
      // ------------------------------------------------------------
      if (['dig', 'melt', 'burn'].includes(commandName) &&
          (target.includes('wax') || target.includes('desk'))) {

        const isFire = ['melt', 'burn'].includes(commandName);

        const held = player.equipment.get('held');
        const hasTorch = held && held.id && held.id.includes('torch');

        const hasSpellLight = player.hasEffect('light_spell');

        const hasFireSource = isFire && (hasTorch || hasSpellLight);

        if (isFire && !hasFireSource) {
          return player.say("You have no flame to melt this stubborn wax.");
        }

        // Flavor
        if (isFire) {
          player.say("<orange>You hold your light source to the wax, watching it liquefy and drip away...</orange>");
        } else {
          player.say("<yellow>You chip away at the monolithic mounds of black wax...</yellow>");
        }

        const roll = Math.floor(Math.random() * 20) + 1;
        const strScore = player.getAttribute('strength') || 10;
        const strMod = Math.floor((strScore - 10) / 2);

        const mod = isFire ? 5 : strMod;

        if (roll + mod >= 15) {

          // --- FIRST FIND: Emerald Focusing Crystal ---
          if (!player.getMeta('found_emerald_key')) {
            player.say("<green>Deep within the core, you find a glowing Emerald Focusing Crystal!</green>");

            const key = state.ItemFactory.create(room.area, 'ossuary:key_emerald');
            if (key) key.moveTo(player);

            player.setMeta('found_emerald_key', true);
          }

          // --- SECOND FIND: Ghost‑Sight Oil Recipe ---
          else if (!player.getMeta('dug_librarian_desk')) {
            player.say("<cyan>You find a charred piece of vellum: A Recipe for 'Ghost‑Sight Oil'.</cyan>");

            const recipe = state.ItemFactory.create(room.area, 'ossuary:recipe_ghost_sight');
            if (recipe) recipe.moveTo(player);

            player.setMeta('dug_librarian_desk', true);
          }

          // --- NOTHING LEFT ---
          else {
            player.say("You find only more half‑burnt wicks and ancient dust.");
          }
        }

        // --- FAILURE ---
        else {
          if (isFire) {
            player.say("The wax is enchanted against heat; it barely softens.");
          } else {
            player.say("The wax is as hard as iron. You blunt your tools.");
          }
        }

        return true;
      }

      // ------------------------------------------------------------
      // GRAB SCROLL — RANDOM TABLE WITH EXHAUSTION LIMIT
      // ------------------------------------------------------------
      if (commandName === 'grab' && target.includes('scroll')) {

        let grabs = player.getMeta('nook_grabs') || 0;

        if (grabs >= 5) {
          return player.say("<red>The magical currents have grown too turbulent. Every scroll you reach for dartingly evades your grasp.</red>");
        }

        player.say("<yellow>You lunge into the air, hands snapping shut on a passing fragment of parchment...</yellow>");
        player.setMeta('nook_grabs', grabs + 1);

        const roll = Math.random();

        // --- 50%: Blank vellum ---
        if (roll < 0.50) {
          player.say("<white>You caught a blank scrap of vellum. It's just a fragment, but it's clean enough to write on.</white>");
        }

        // --- 25%: Poetic fragment (sanity boost) ---
        else if (roll < 0.75) {
          player.say("<cyan>You caught a snippet of poetry. Reading it aloud makes you feel slightly more at peace.</cyan>");
          player.mutateAttribute('sanity', 1);
        }

        // --- 15%: Scroll of Spark ---
        else if (roll < 0.90) {
          player.say("<magenta>You snatched a 'Scroll of Spark'! A minor cantrip, but it glows with light.</magenta>");

          const spark = state.ItemFactory.create(room.area, 'ossuary:scroll_spark');
          if (spark) spark.moveTo(player);
        }

        // --- 10%: Librarian’s Index (map) ---
        else {
          player.say("<green>You caught a rare 'Librarian's Index'! It's a map of the Western Wing.</green>");

          const map = state.ItemFactory.create(room.area, 'ossuary:ossuary_map_west');
          if (map) map.moveTo(player);
        }

        return true;
      }
    }
  }
};
