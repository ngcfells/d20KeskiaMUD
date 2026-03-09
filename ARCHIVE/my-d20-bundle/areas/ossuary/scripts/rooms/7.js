// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/7.js
'use strict';

module.exports = {
  listeners: {

    // --- Ambient Shadow Effects ---
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      for (const player of room.players) {

        // 1. Environmental Whispers (8%)
        if (Math.random() < 0.08) {
          const whispers = [
            "Shadows stretch toward the flickering light of your torch.",
            "The scratching of phantom quills on parchment echoes from the rotted carrels.",
            "A cold draft ruffles the cured-skin pages of the stone-bound book."
          ];
          player.say(`<magenta>${whispers[Math.floor(Math.random() * whispers.length)]}</magenta>`);
        }

        // 2. Negative Energy Drain (2%)
        if (Math.random() < 0.02) {
          player.say("<red>The shadows lean inward, drinking a sliver of your warmth.</red>");
          player.mutateAttribute('health', -1);
        }
      }
    },

    // --- Reading the Liturgy of the Obsidian Veil ---
    command: state => function (commandName, args, player) {
      if (commandName !== 'read' || !args || !args.toLowerCase().includes('book')) return;

      // --- Knowledge (Religion) Check ---
      const dc = state.DCTables.getDC("occultism", ["cthulhu", "occultism"], "moderate") || 15;

      // Skill ranks (umbrella: knowledge.religion OR religion)
      const skillRanks =
        player.getSkill('knowledge.religion') ??
        player.getSkill('religion') ??
        0;

      // INT modifier
      const intScore = player.getAttribute('intelligence') || 10;
      const intMod = Math.floor((intScore - 10) / 2);

      const roll = Math.floor(Math.random() * 20) + 1;
      const total = roll + intMod + skillRanks;

      player.say("\n<yellow>You study the writhing text of the 'Liturgy of the Obsidian Veil'...</yellow>");
      player.say(`<white>[ Knowledge (Religion): ${roll} + ${intMod} + ${skillRanks} vs DC ${dc} ]</white>`);

      if (total >= dc) {
        player.say("<cyan>You decipher a passage: 'Valerius traded his pulse for the void. His heart is brittle stone; strike it hard and strike it true.'</cyan>");
        player.setMeta('boss_hint_valerius', true);
      } else {
        player.say("<red>The letters twist and bite at your vision. You cannot grasp the scripture's meaning.</red>");
        player.mutateAttribute('sanity', -1);
      }

      return true;
    }
  }
};
