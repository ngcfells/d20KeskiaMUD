// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/2.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => function () {
      const room = this;
      if (room.players.size === 0) return;

      // ---------------------------------------------------------------------
      // --- Rare Spawn: Mural‑Touched Vermin ---
      // Starter-area friendly, mythos-adjacent, 45s cooldown
      // ---------------------------------------------------------------------
      if (!room.getMeta('vermin_spawn_cooldown')) {
        // Very low chance (2%) to spawn
        if (Math.random() < 0.02) {
          const mob = state.MobFactory.create(room.area, 'ossuary:mural_touched_vermin');
          if (mob) {
            mob.hydrate(state);
            mob.moveTo(room);

            room.broadcast("<magenta>A small creature skitters from behind the murals, its movements sharp and unnatural.</magenta>");

            // Prevent rapid respawn
            room.setMeta('vermin_spawn_cooldown', true);
            setTimeout(() => room.setMeta('vermin_spawn_cooldown', false), 45000);
          }
        }
      }
      // ---------------------------------------------------------------------
    },

    command: state => function (commandName, args, player) {
      if (commandName !== 'look' || !args) return;

      const target = args.toLowerCase();
      const triggers = ['murals','saints','mural','saint'];
      if (!triggers.some(t => target.includes(t))) return;

      if (player.hasEffect('mental_trauma')) return;

      // --- Descriptive Setup ---
      player.say("<white>The murals depict once‑revered saints, their faces gouged away with unsettling precision.</white>");
      player.say("<white>Darkened residue clings to the grooves, flaking like old lacquer.</white>");

      // --- Emotional Residue (Environmental) ---
      player.say("<magenta>A lingering tension hangs in the air, as though the act of defacement left a psychic bruise.</magenta>");

      // --- Force‑Sensitive Hook (FS‑2 threshold) ---
      if (player.getMeta('is_force_sensitive') === true) {
        player.say("<cyan>The Force recoils here in subtle eddies, as if the desecration disrupted something once harmonious.</cyan>");
      }

      // --- Psionic Empath Hook ---
      if (player.getMeta('is_psionic_empath') === true) {
        player.say("<magenta>A brittle emotional residue clings to the murals — sharp, deliberate, and unresolved.</magenta>");
      }

      // --- Will Save vs Forbidden Lore ---
      const dc = state.DCTables.getDC("occultism", ["cthulhu","occultism"], "forbidden_lore") || 25;
      const willMod = player.getAttribute('will') || 0;
      const roll = Math.floor(Math.random() * 20) + 1;
      const total = roll + willMod;

      player.say(`<white>[ Will Save: ${roll} + ${willMod} vs DC ${dc} ]</white>`);

      if (total < dc) {
        player.say("<red>The patterns resolve into something that should not be comprehensible. A sharp pressure spikes behind your eyes.</red>");

        if (player.hasAttribute('sanity')) {
          player.mutateAttribute('sanity', -10);
        }

        if (state.EffectFactory.has('mental_trauma')) {
          const trauma = state.EffectFactory.create('mental_trauma', {
            duration: 60000,
            name: 'Shaken'
          });
          player.addEffect(trauma);
        }
      } else {
        player.say("<yellow>You avert your gaze before the patterns fully resolve, the tension in the air lingering like a held breath.</yellow>");
      }

      return true;
    }
  }
};
