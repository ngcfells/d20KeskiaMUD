// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/22.js
'use strict';

/**
 * Room Script: The Vermin Nest (ID: 22)
 * Handles:
 *  - Burning the caustic webbing
 *  - Triggering spider spawns
 *  - Busting cocoons for random outcomes
 */

module.exports = {
  listeners: {

    // ============================================================
    // 1. COMMAND HANDLER
    // ============================================================
    command: state => function (commandName, args, player) {
      const room = this;
      const target = args ? args.toLowerCase() : '';

      // ------------------------------------------------------------
      // SETTING FIRE TO THE WEBBING
      // ------------------------------------------------------------
      if (['burn', 'fire', 'light'].includes(commandName) &&
          target.includes('web')) {

        const held = player.equipment.get('held');
        const hasTorch = held && held.id && held.id.includes('torch');
        const hasSpellLight = player.hasEffect('light_spell');

        const hasFlame = hasTorch || hasSpellLight;

        if (!hasFlame) {
          return player.say("You have no flame to set the webs alight.");
        }

        room.broadcast("<red>The sticky webbing ignites with a sudden, oily WHOOSH!</red>");
        room.broadcast("<red>The fire consumes the nests, flushing out anything hiding in the rafters!</red>");

        // Spawn 2 spiders (per your original intent)
        const area = room.area;

        const spider1 = state.MobManager.create(area, 'ossuary:monstrous_spider_medium');
        const spider2 = state.MobManager.create(area, 'ossuary:monstrous_spider_medium');

        if (spider1) {
          spider1.moveTo(room);
          spider1.initiateCombat(player);
        }

        if (spider2) {
          spider2.moveTo(room);
          spider2.initiateCombat(player);
        }

        return true;
      }

      // ------------------------------------------------------------
      // BUSTING / OPENING COCOONS
      // ------------------------------------------------------------
      if ((commandName === 'bust' || commandName === 'open') &&
          target.includes('cocoon')) {

        player.say("<yellow>You tear into the thick, sticky silk of a cocoon...</yellow>");

        const roll = Math.random();

        // --- 30%: Rat corpse + spiderlings (damage) ---
        if (roll < 0.30) {
          player.say("<red>A half-dissolved rat falls out, followed by a swarm of angry spiderlings!</red>");
          player.mutateAttribute('health', -2);
        }

        // --- 30%: Mummified corpse + gold coins ---
        else if (roll < 0.60) {
          player.say("<green>You find a mummified corpse holding a few gold coins.</green>");

          const gold = state.ItemFactory.create(room.area, 'ossuary:gold_coins');
          if (gold) gold.moveTo(player);
        }

        // --- 40%: Empty cocoon ---
        else {
          player.say("This cocoon is empty, save for a lingering, sweet smell of rot.");
        }

        return true;
      }
    }
  }
};
