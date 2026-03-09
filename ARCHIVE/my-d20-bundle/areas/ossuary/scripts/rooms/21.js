// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/21.js
'use strict';

/**
 * Room Script: The Golem's Alcove (ID: 21)
 * Handles:
 *  - Anti-magic suppression on entry
 *  - Psionic focus exception
 *  - Awakening the Stone Guardian
 */

module.exports = {
  listeners: {

    // ============================================================
    // 1. ANTI-MAGIC SUPPRESSION ON ENTRY
    // ============================================================
    playerEnter: state => function (player) {
      const room = this;

      // --- Remove magical light effects ---
      if (player.hasEffect('light_spell')) {
        player.removeEffect('light_spell');
        player.say("<red>Your magical light flickers and dies instantly in the void of the alcove.</red>");
      }

      // --- Remove psionic glow? No — psionics resist anti-magic ---
      const held = player.equipment.get('held');
      const hasPsionicFocus = held && held.id && held.id.includes('psionic_focus');

      if (hasPsionicFocus) {
        player.say("<magenta>Your Psionic Focus pulses with a stubborn violet light, resisting the anti-magic dampening.</magenta>");
      } else {
        player.say("<blue>You are plunged into a profound, hollow darkness.</blue>");
      }
    },

    // ============================================================
    // 2. COMMAND HANDLER — SPELL BLOCK + GUARDIAN AWAKENING
    // ============================================================
    command: state => function (commandName, args, player) {
      const room = this;
      const target = args ? args.toLowerCase() : '';

      // ------------------------------------------------------------
      // BLOCK ALL SPELLCASTING
      // ------------------------------------------------------------
      if (commandName === 'cast') {
        player.say("<red>The words of power turn to ash in your mouth. Magic cannot exist here.</red>");
        return true;
      }

      // ------------------------------------------------------------
      // AWAKEN THE STONE GUARDIAN
      // ------------------------------------------------------------
      if (['strike', 'touch', 'push'].includes(commandName) &&
          target.includes('guardian')) {

        if (room.getMeta('guardian_active')) {
          return player.say("<yellow>The guardian is already awake and hostile!</yellow>");
        }

        player.say("\n<red>As you touch the cold stone, the deep runes on the guardian's chest flare with a dull, leaden light!</red>");
        room.setMeta('guardian_active', true);

        const area = room.area;
        const golem = state.MobManager.create(area, 'ossuary:stone_guardian');

        if (golem) {
          golem.moveTo(room);
          golem.initiateCombat(player);
        }

        return true;
      }
    }
  }
};
