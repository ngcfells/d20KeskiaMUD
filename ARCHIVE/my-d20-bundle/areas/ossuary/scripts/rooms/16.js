// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/16.js
'use strict';

/**
 * Room Script: The Echoing Corridor (ID: 16)
 * Handles:
 *  - Dynamic light reflection behavior
 *  - Triple Echo effect on speech
 *  - Wild magic reaction on entry
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
      // DYNAMIC LIGHT REFLECTION (Triggered on LOOK)
      // ------------------------------------------------------------
      if (commandName === 'look' &&
          (!args || target.includes('walls') || target.includes('reflections'))) {

        const held = player.equipment.get('held');
        const hasTorch = held && held.id && held.id.includes('torch');

        const hasSpellLight =
          player.hasEffect('light_spell') ||
          player.hasEffect('psionic_glow');

        if (hasSpellLight) {
          player.say("<magenta>The magical radiance of your aura causes the obsidian to hum. The violet tint deepens, revealing flickering runes beneath the surface.</magenta>");
        } else if (hasTorch) {
          player.say("<yellow>The orange flame of your torch dances wildly in the black stone, casting long, jittery shadows that seem to peel away from the wall.</yellow>");
        }

        return false; // allow normal LOOK to continue
      }

      // ------------------------------------------------------------
      // TRIPLE ECHO EFFECT (Speech Distortion)
      // ------------------------------------------------------------
      if (['say', 'yell', 'shout'].includes(commandName) && args) {
        const original = args.trim();

        // Echo 1 — Slight delay, normal
        setTimeout(() => {
          player.say(`<cyan>...${original}...</cyan>`);
        }, 800);

        // Echo 2 — Vowel distortion
        setTimeout(() => {
          const distorted = original.replace(/[aeiou]/gi, '.');
          player.say(`<blue>...${distorted}...</blue>`);
        }, 1600);

        // Echo 3 — Corruption‑based whisper
        setTimeout(() => {
          const corruption = player.getAttribute('corruption') || 0;
          const truth = corruption > 5
            ? "The void welcomes your voice..."
            : "...echoes...echoes...of the dead...";
          player.say(`<magenta><italic>${truth}</italic></magenta>`);
        }, 2400);

        return false; // allow the original SAY to still broadcast normally
      }
    },

    // ============================================================
    // 2. WILD MAGIC REACTION ON ENTRY
    // ============================================================
    playerEnter: state => function (player) {
      const hasAura =
        player.hasEffect('light_spell') ||
        player.hasEffect('psionic_glow');

      if (hasAura) {
        player.say("<magenta>The wild magic of the corridor reacts to your active aura, making the air feel thick and static.</magenta>");
      }
    },

    // ============================================================
    // 3. AMBIENT ECHO ATMOSPHERE
    // ============================================================
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      if (Math.random() < 0.05) {
        room.broadcast("<italic>The air here is so still it feels heavy, as if the very atoms of the room are being held in place by an ancient will.</italic>");
      }
    }
  }
};
