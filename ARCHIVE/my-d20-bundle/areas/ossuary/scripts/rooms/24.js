// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/24.js
'use strict';

/**
 * Room Script: The Shaman’s Sanctuary (ID: 24)
 * Handles:
 *  - Wild magic surges
 *  - Interacting with the cauldron (taste, stir, inspect)
 *  - Interacting with the bone shrine (offerings or desecration)
 *  - Goblin shaman reaction + combat triggers
 */

module.exports = {
  listeners: {

    // ============================================================
    // 1. WILD MAGIC SURGES (Ambient)
    // ============================================================
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      if (Math.random() < 0.06) {
        const surges = [
          "The violet light flickers violently, warping the shadows into impossible shapes.",
          "A ripple of distortion passes through the air, bending your vision for a heartbeat.",
          "The cauldron belches a bubble of green vapor that pops with a psionic crack.",
          "The bone shrine emits a low, droning hum that vibrates in your teeth."
        ];

        room.broadcast(`<italic>${surges[Math.floor(Math.random() * surges.length)]}</italic>`);
      }
    },

    // ============================================================
    // 2. COMMAND HANDLER — CAULDRON, SHRINE, SHAMAN
    // ============================================================
    command: state => function (commandName, args, player) {
      const room = this;
      const target = args ? args.toLowerCase() : '';

      const shaman = [...room.npcs].find(n => n.id.includes('goblin_shaman'));

      // ------------------------------------------------------------
      // CAULDRON INTERACTIONS
      // ------------------------------------------------------------
      if (['taste', 'sip', 'drink'].includes(commandName) &&
          target.includes('cauldron')) {

        player.say("<yellow>You lean over the bubbling cauldron and take the smallest possible sip...</yellow>");

        const roll = Math.random();

        // 30% — Poisoned
        if (roll < 0.30) {
          player.say("<red>The sludge burns your throat! You choke violently.</red>");
          player.mutateAttribute('health', -5);

          if (shaman && !shaman.isInCombat()) {
            shaman.say("<green>Heheheh! Foolish outsider! Drink more!");
            shaman.initiateCombat(player);
          }
        }

        // 30% — Hallucination (Sanity loss)
        else if (roll < 0.60) {
          player.say("<magenta>Your vision fractures into spirals of violet and green. The room tilts sideways.</magenta>");
          if (player.hasAttribute('sanity')) {
            player.mutateAttribute('sanity', -3);
          }
        }

        // 40% — Unexpected buff
        else {
          player.say("<cyan>The taste is foul, but you feel a strange surge of vitality.</cyan>");
          player.mutateAttribute('stamina', 10);
        }

        return true;
      }

      // ------------------------------------------------------------
      // STIR THE CAULDRON
      // ------------------------------------------------------------
      if (['stir', 'mix'].includes(commandName) &&
          target.includes('cauldron')) {

        player.say("<yellow>You stir the bubbling green sludge with a nearby bone ladle...</yellow>");

        const roll = Math.random();

        // 25% — Explosion
        if (roll < 0.25) {
          room.broadcast("<red>The cauldron erupts in a spray of boiling sludge!</red>");
          player.mutateAttribute('health', -8);

          if (shaman && !shaman.isInCombat()) {
            shaman.say("<green>NO TOUCH! MINE! MINE!");
            shaman.initiateCombat(player);
          }
        }

        // 25% — Summon a small ooze
        else if (roll < 0.50) {
          room.broadcast("<magenta>The cauldron gurgles and spits out a quivering glob of acidic ooze!");
          const ooze = state.MobManager.create(room.area, 'ossuary:cauldron_ooze');
          if (ooze) {
            ooze.moveTo(room);
            ooze.initiateCombat(player);
          }
        }

        // 50% — Harmless burble
        else {
          player.say("<white>The cauldron burbles contentedly, as if amused.</white>");
        }

        return true;
      }

      // ------------------------------------------------------------
      // SHRINE INTERACTIONS
      // ------------------------------------------------------------
      if (['offer', 'place', 'give'].includes(commandName) &&
          target.includes('shrine')) {

        player.say("<yellow>You place a small offering upon the bone shrine...</yellow>");

        const roll = Math.random();

        // 50% — Blessing
        if (roll < 0.50) {
          player.say("<cyan>The skulls rattle approvingly. A warm pulse flows through your limbs.</cyan>");
          player.mutateAttribute('resolve', 1);
        }

        // 50% — Rejection
        else {
          player.say("<red>The skulls snap their jaws in unison! A psychic backlash stings your mind.</red>");
          if (player.hasAttribute('sanity')) {
            player.mutateAttribute('sanity', -2);
          }
        }

        return true;
      }

      // ------------------------------------------------------------
      // DESECRATE SHRINE
      // ------------------------------------------------------------
      if (['kick', 'smash', 'break'].includes(commandName) &&
          target.includes('shrine')) {

        player.say("<red>You strike the bone shrine, scattering skulls across the floor!</red>");

        if (shaman && !shaman.isInCombat()) {
          shaman.say("<green>BLASPHEMER! YOU DIE NOW!");
          shaman.initiateCombat(player);
        }

        // Sanity penalty
        if (player.hasAttribute('sanity')) {
          player.mutateAttribute('sanity', -3);
        }

        return true;
      }
    }
  }
};
