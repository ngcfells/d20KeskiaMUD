// path: bundles\my-d20-bundle\areas\ossuary\scripts\items\vault_chest_logic.js

'use strict';

module.exports = {
  listeners: {
    command: state => function (commandName, args, player) {
      const item = this; // the chest itself

      if (!item || !item.metadata) return;

      // Only respond to relevant commands
      if (!['press', 'force', 'break', 'attune', 'cast', 'pick'].includes(commandName)) {
        return;
      }

      const metadata = item.metadata;

      if (!metadata.isLocked) {
        return player.say("The chest is already open.");
      }

      // --- 1. SIGNET RING (Instant Success) ---
      if (commandName === 'press' && args && args.includes('ring')) {
        const ring = player.inventory.find(i => i.id.includes('silver_signet_ring'));
        if (ring) {
          player.say("<cyan>You press the Arch-Priest's signet ring into the indentation. The silver etchings flare with white light, and the bolts retract with a satisfying 'clack'.</cyan>");
          metadata.isLocked = false;
          return true;
        } else {
          return player.say("You don't have a ring that fits.");
        }
      }

      // --- 2. STRENGTH (Heave/Force) ---
      if (commandName === 'force' || commandName === 'break') {
        const dc = state.DCTables.universal.hard; // DC 20
        const strMod = Math.floor(((player.getAttribute('strength') || 10) - 10) / 2);
        const roll = Math.floor(Math.random() * 20) + 1;

        player.say("<yellow>You strain against the iron bands, attempting to snap the arcane seals by brute force...</yellow>");
        if (roll + strMod >= dc) {
          player.say("<green>With a scream of twisting metal, you shatter the lock! The chest lid pops open.</green>");
          metadata.isLocked = false;
        } else {
          player.say("<red>The chest doesn't budge, and the feedback from the runes leaves your muscles aching.</red>");
          player.mutateAttribute('stamina', -5);
        }
        return true;
      }

      // --- 3. PSIONICS / MAGIC (Attune/Unlock) ---
      if (commandName === 'attune' || commandName === 'cast') {
        const dc = state.DCTables.getDC("spellcraft", [], "counterspell") || 20;
        const skill = Math.max(player.getSkill('psionics') || 0, player.getSkill('spellcraft') || 0);
        const roll = Math.floor(Math.random() * 20) + 1;

        player.say("<magenta>You focus your mind on the crystalline veins, weaving your energy into the chest's matrix...</magenta>");
        if (roll + skill >= dc) {
          player.say("<cyan>The blue veins pulse once, then go dark. The magical seal has been dissolved.</cyan>");
          metadata.isLocked = false;
        } else {
          player.say("<red>Your mental probe is violently deflected! A psychic backlash stings your mind.</red>");
          player.mutateAttribute('sanity', -5);
        }
        return true;
      }

      // --- 4. THIEVERY (Pick) ---
      if (commandName === 'pick') {
        const dc = state.DCTables.getDC("disable_device", [], "hard") || 25;
        const skill = player.getSkill('disable_device') || 0;
        const roll = Math.floor(Math.random() * 20) + 1;

        player.say("<yellow>You carefully probe the internal mechanisms behind the iron bands...</yellow>");
        if (roll + skill >= dc) {
          player.say("<green>You hear a series of soft mechanical clicks as the internal tumblers fall into place. Unlocked!</green>");
          metadata.isLocked = false;
        } else {
          player.say("<red>Your tools slip. This mechanism is far more complex than a standard lock.</red>");
        }
        return true;
      }
    }
  }
};
