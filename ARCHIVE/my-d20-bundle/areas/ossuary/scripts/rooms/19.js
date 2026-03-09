// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/19.js
'use strict';

/**
 * Room Script: The Hall of Mirrors (ID: 19)
 * Handles:
 *  - Lingering reflection illusions
 *  - Corruption-triggered Mirror Doppelganger ambush
 *  - Mirror cleaning (sanity check + latch discovery)
 */

module.exports = {
  listeners: {

    // ============================================================
    // 1. AMBIENT REFLECTION BEHAVIOR + DOPPELGANGER TRIGGER
    // ============================================================
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      for (const player of room.players) {

        // ------------------------------------------------------------
        // LINGERING REFLECTION EMOTE
        // ------------------------------------------------------------
        if (Math.random() < 0.05) {
          player.say("\n<magenta>You stop moving, but your reflection in the tarnished silver takes a few more steps before turning to watch you.</magenta>");
        }

        // ------------------------------------------------------------
        // CORRUPTION‑BASED DOPPELGANGER AMBUSH
        // ------------------------------------------------------------
        const corruption = player.getAttribute('corruption') || 0;

        if (corruption > 5 && Math.random() < 0.02) {

          // Prevent multiple spawns
          const existing = [...room.npcs].find(n => n.id.includes('mirror_doppelganger'));
          if (existing) continue;

          // Flavor
          player.say("\n<red>Your reflection in the glass grins with teeth you don't possess. It reaches out, its silver hand passing through the surface to seize your throat!</red>");
          room.broadcastExcept(player, `<red>The mirror beside ${player.name} ripples as a shimmering reflection claws its way into reality!</red>`);

          // Spawn the doppelganger
          const area = room.area;
          const doppel = state.MobManager.create(area, 'ossuary:mirror_doppelganger');

          if (doppel) {
            doppel.moveTo(room);

            // Immediate combat
            doppel.initiateCombat(player);

            // Surprise Reflex Save
            const dc = 15;
            const reflex = player.getAttribute('reflex') || 0;
            const roll = Math.floor(Math.random() * 20) + 1;

            player.say(`<white>[ Reflex Save: ${roll} + ${reflex} vs DC ${dc} ]</white>`);

            if (roll + reflex < dc) {
              player.say("<red>The shock of the ambush leaves you paralyzed! You are flat-footed!</red>");

              if (state.EffectFactory.has('flat_footed')) {
                const ff = state.EffectFactory.create('flat_footed', { duration: 6000 });
                player.addEffect(ff);
              }
            }
          }
        }
      }
    },

    // ============================================================
    // 2. MIRROR CLEANING — SANITY CHECK + LATCH DISCOVERY
    // ============================================================
    command: state => function (commandName, args, player) {
      const target = args ? args.toLowerCase() : '';

      if (commandName === 'clean' && target.includes('mirror')) {

        player.say("<yellow>You use a bit of your sleeve to rub away the greasy tarnish...</yellow>");

        const dc = 15;
        const will = player.getAttribute('will') || 0;
        const roll = Math.floor(Math.random() * 20) + 1;

        player.say(`<white>[ Will Save: ${roll} + ${will} vs DC ${dc} ]</white>`);

        // --- FAILURE: Sanity Loss ---
        if (roll + will < dc) {
          player.say("<red>The glass clears, but the face looking back is a hollow-cheeked version of you, screaming in absolute silence.</red>");

          if (player.hasAttribute('sanity')) {
            player.mutateAttribute('sanity', -5);
          }

          player.say("<magenta>Your sanity wavers at the sight.</magenta>");
        }

        // --- SUCCESS: Hidden Latch ---
        else {
          player.say("<cyan>The glass clears, revealing a hidden bronze latch behind the silver backing.</cyan>");
          player.setMeta('found_mirror_latch', true);
        }

        return true;
      }
    }
  }
};
