// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/14.js
'use strict';

/**
 * Room Script: The Secret Vault (ID: 14)
 * Handles:
 *  - Ambient supernatural stillness
 *  - Psionic/magical attunement to the chest
 *  - Using the signet ring to unlock the vault
 */

module.exports = {
  listeners: {

    // --- Ambient Stillness ---
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      if (Math.random() < 0.05) {
        room.broadcast("<italic>The air here is so still it feels heavy, as if the very atoms of the room are being held in place by an ancient will.</italic>");
      }
    },

    // --- Entry Flavor ---
    playerEnter: state => function (player) {
      player.say("<cyan>You have entered a space untouched by the rot of the pantry. It is unnervingly clean.</cyan>");
    },

    // --- Chest Interaction Logic ---
    command: state => function (commandName, args, player) {
      const room = this;
      const target = args ? args.toLowerCase() : '';

      // --- ATTUNE CHEST (Psionic or Magic) ---
      if (commandName === 'attune' && target.includes('chest')) {

        if (!room.getMeta('is_locked')) {
          player.say("<yellow>The chest is already attuned and unlocked.</yellow>");
          return true;
        }

        const dc = state.DCTables.getDC("psionics", ["abjuration"], "hard") || 20;

        const psiSkill = player.getSkill('psionics') || 0;
        const magicSkill = player.getSkill('spellcraft') || 0;

        const skill = Math.max(psiSkill, magicSkill);

        const roll = Math.floor(Math.random() * 20) + 1;
        const total = roll + skill;

        player.say("<yellow>You place your hands upon the crystalline veins of the chest, focusing your will...</yellow>");
        player.say(`<white>[ Attunement Check: ${roll} + ${skill} vs DC ${dc} ]</white>`);

        if (total >= dc) {
          player.say("<cyan>The crystalline veins flare with pale blue light and then fade. The chest clicks open.</cyan>");
          room.setMeta('is_locked', false);
        } else {
          player.say("<red>The chest rejects your attempt. A psychic backlash stings your mind.</red>");
          player.mutateAttribute('sanity', -1);
        }

        return true;
      }

      // --- USE SIGNET RING ---
      if (commandName === 'use' && target.includes('ring')) {

        const ring = player.inventory.find(i => i.id.includes('silver_signet_ring'));

        if (!ring) {
          player.say("<red>You press your hand to the indentation, but nothing happens.</red>");
          return true;
        }

        if (!room.getMeta('is_locked')) {
          player.say("<yellow>The chest is already unlocked.</yellow>");
          return true;
        }

        player.say("<cyan>You press the silver signet ring into the circular indentation...</cyan>");

        setTimeout(() => {
          room.broadcast("<yellow>The crystalline veins pulse once, then dissolve into motes of blue light.</yellow>");
          room.setMeta('is_locked', false);
        }, 1500);

        return true;
      }

      // --- OPEN CHEST ---
      if (commandName === 'open' && target.includes('chest')) {

        if (room.getMeta('is_locked')) {
          player.say("<red>The chest refuses to budge. It is sealed by more than mundane means.</red>");
          return true;
        }

        // Chest is unlocked — reveal contents
        const chestItem = room.items.find(i => i.id.includes('vault_chest'));

        if (!chestItem) {
          player.say("<yellow>The chest is already empty.</yellow>");
          return true;
        }

        player.say("<cyan>You lift the heavy lid. Inside lies a relic wrapped in ancient cloth.</cyan>");

        // Move chest contents to player
        if (chestItem) {
          chestItem.moveTo(player);
        }

        return true;
      }
    }
  }
};
