// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/23.js
'use strict';

/**
 * Room Script: The Trapped Altar (ID: 23)
 * Handles:
 *  - Currency sacrifice (scaling rewards)
 *  - Item sacrifice (cleansing, resolve, healing, weapon blessing)
 *  - Passive positive‑energy healing
 */

module.exports = {
  listeners: {

    // ============================================================
    // 1. COMMAND HANDLER — SACRIFICE / OFFER / BURN
    // ============================================================
    command: state => function (commandName, args, player) {
      if (!['sacrifice', 'offer', 'burn'].includes(commandName) || !args) return;

      const room = this;
      const input = args.toLowerCase().split(' '); // e.g. "5 sp"
      const amount = parseInt(input[0], 10);
      const denom = input[1];

      // ------------------------------------------------------------
      // CURRENCY SACRIFICE
      // ------------------------------------------------------------
      if (!isNaN(amount) && ['cp', 'sp', 'gp'].includes(denom)) {

        const wallet = player.getMeta('currencies') || { cp: 0, sp: 0, gp: 0 };

        if (wallet[denom] < amount) {
          return player.say(`You do not have ${amount}${denom.toUpperCase()} to offer.`);
        }

        player.say(`\n<white>You toss ${amount} ${denom.toUpperCase()} into the white flames.</white>`);

        // Deduct currency
        wallet[denom] -= amount;
        player.setMeta('currencies', wallet);

        // Convert to copper for value scaling
        const valueInCP =
          denom === 'gp' ? amount * 100 :
          denom === 'sp' ? amount * 10 :
          amount;

        // --- Significant sacrifice (1gp+)
        if (valueInCP >= 100) {
          player.mutateAttribute('health', 15);
          player.mutateAttribute('sanity', 5);
          player.say("<cyan>The flames roar high, bathing you in a restorative light. Your wounds knit and your mind clears.</cyan>");
        }

        // --- Minor sacrifice
        else {
          player.mutateAttribute('health', 2);
          player.say("<cyan>The fire crackles contentedly. You feel a small surge of vitality.</cyan>");
        }

        return true;
      }

      // ------------------------------------------------------------
      // ITEM SACRIFICE
      // ------------------------------------------------------------
      const item = player.inventory.find(i =>
        i.name.toLowerCase().includes(args.toLowerCase())
      );

      if (!item) {
        return player.say("You don't have that in your inventory.");
      }

      player.say(`\n<white>You place the ${item.name} into the eternal white flame of the altar...</white>`);

      const itemId = item.id;
      let rewardMsg = "";

      // ------------------------------------------------------------
      // 1. PILGRIM EYE GEMS — CLEANSING
      // ------------------------------------------------------------
      if (itemId.includes('pilgrim_eye_gem')) {
        const corruption = player.getAttribute('corruption') || 0;

        const cleanse = Math.min(corruption, 2);
        player.mutateAttribute('corruption', -cleanse);
        player.mutateAttribute('sanity', 5);

        rewardMsg = "The flame turns a brilliant gold, burning away the tarnish on your soul. Your mind feels clear.";
      }

      // ------------------------------------------------------------
      // 2. VELLUM / SCROLLS — KNOWLEDGE / RESOLVE
      // ------------------------------------------------------------
      else if (itemId.includes('vellum_scrap') || itemId.includes('scroll')) {
        player.mutateAttribute('resolve', 2);
        rewardMsg = "The smoke from the parchment carries the scent of ancient libraries. Your will is bolstered.";
      }

      // ------------------------------------------------------------
      // 3. MIXED COINS — HEALING + STAMINA
      // ------------------------------------------------------------
      else if (itemId.includes('mixed_coins')) {
        player.mutateAttribute('health', 10);
        if (player.hasAttribute('stamina')) {
          player.mutateAttribute('stamina', 20);
        }
        rewardMsg = "The metal vanishes instantly. A wave of warmth washes over you, knitting your wounds.";
      }

      // ------------------------------------------------------------
      // 4. WEAPONS — BLESSING
      // ------------------------------------------------------------
      else if (item.type === 'WEAPON') {
        item.metadata = item.metadata || {};
        item.metadata.is_blessed = true;

        // Avoid double‑prefixing
        if (!item.name.toLowerCase().includes('blessed')) {
          item.name = `Blessed ${item.name}`;
        }

        rewardMsg = "The flame dances along the length of your weapon, leaving a faint, holy hum in the metal.";
      }

      // ------------------------------------------------------------
      // 5. DEFAULT — ACCEPTED BUT MINOR RESPONSE
      // ------------------------------------------------------------
      else {
        rewardMsg = "The flames accept your offering, though they respond only faintly.";
      }

      // Execute sacrifice
      player.say(`<cyan>${rewardMsg}</cyan>`);
      state.ItemManager.remove(item);

      return true;
    },

    // ============================================================
    // 2. PASSIVE POSITIVE‑ENERGY HEALING
    // ============================================================
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      if (Math.random() < 0.05) {
        for (const p of room.players) {
          p.mutateAttribute('health', 1);
          p.say("<white>The positive energy of the altar soothes your aches.</white>");
        }
      }
    }
  }
};
