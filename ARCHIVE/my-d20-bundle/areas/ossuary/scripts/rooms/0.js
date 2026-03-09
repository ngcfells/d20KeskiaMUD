// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/0.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => function () {
      const room = this;
      if (room.players.size === 0) return;

      // --- Dynamic Weather Toggle (2%) ---
      if (Math.random() < 0.02) {
        const isRaining = room.getMeta('is_raining');

        if (isRaining) {
          room.setMeta('is_raining', false);
          room.broadcast(
            "<cyan>The downpour slackens, leaving a thin, drifting mist that clings to stone and shadow.</cyan>"
          );
        } else {
          room.setMeta('is_raining', true);
          room.broadcast(
            "<blue>Clouds gather with deliberate weight as a hard rain begins to lash the threshold.</blue>"
          );
        }
      }

      // --- Ambient Effects (5%) ---
      if (Math.random() < 0.05) {
        const effects = Object.values(room.getMeta('ambient_effects') || {});
        if (effects.length > 0) {
          const randomEffect = effects[Math.floor(Math.random() * effects.length)];
          room.broadcast(`<italic>${randomEffect}</italic>`);
        }
      }

      // ---------------------------------------------------------------------
      // --- Wandering Mob Spawn (Damp Skeleton) ---
      // Starter-area friendly, low threat, 30s cooldown
      // ---------------------------------------------------------------------
      if (!room.getMeta('spawn_cooldown')) {
        // 6% chance per tick to spawn a skeleton
        if (Math.random() < 0.06) {
          const mob = state.MobFactory.create(room.area, 'ossuary:damp_skeleton');
          if (mob) {
            mob.hydrate(state);
            mob.moveTo(room);

            room.broadcast("<gray>A damp skeleton drags itself from the shadows, joints creaking softly.</gray>");

            // Prevent rapid respawn
            room.setMeta('spawn_cooldown', true);
            setTimeout(() => room.setMeta('spawn_cooldown', false), 30000);
          }
        }
      }
      // ---------------------------------------------------------------------
    },

    command: state => function (commandName, args, player) {
      const room = this;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = ['look','examine','touch','feel','smell','sniff','taste','listen','search'];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        threshold: "A weather‑worn stone threshold marks the boundary between the outer world and the ossuary’s depths.",
        mist: "The mist drifts in slow coils, gathering in hollows and slipping across the stones.",
        rain: "Cold rain falls in uneven sheets, striking the stone with a steady, rhythmic patter.",
        stones: "The stones are darkened by moisture, their surfaces etched with age and long use.",
        sky: "The sky above churns with heavy clouds, their movements slow and deliberate."
      };

      // LISTEN
      if (commandName === 'listen') {
        player.say("<white>The rain’s cadence shifts across stone and archway, a restless pattern without rhythm.</white>");
        return true;
      }

      // SMELL
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The air carries the scent of wet stone and distant earth.</white>");
        return true;
      }

      // TASTE
      if (commandName === 'taste') {
        player.say("<white>Cold droplets gather on your lips, metallic and clean.</white>");
        return true;
      }

      // SEARCH
      if (commandName === 'search') {
        player.say("<yellow>You search the threshold, tracing the edges where stone meets shadow...</yellow>");
        player.say("<white>No hidden markings reveal themselves here.</white>");
        return true;
      }

      // FORCE‑SENSITIVE HOOK (FS‑2: only if strong enough)
      if (player.getMeta('is_force_sensitive') === true) {
        if (commandName === 'listen' || commandName === 'examine') {
          player.say("<cyan>A subtle ripple brushes the edge of your awareness, as though the Force takes note of your arrival.</cyan>");
        }
      }

      // PSIONIC EMPATHY HOOK
      if (player.getMeta('is_psionic_empath') === true && commandName === 'sense') {
        player.say("<magenta>A faint emotional residue lingers here — not fear or sorrow, but anticipation, like a held breath.</magenta>");
        return true;
      }

      // SENSORY INTERACTIONS FOR NOUNS
      if (!target) return false;
      const key = Object.keys(nouns).find(k => target.includes(k));
      if (!key) return false;

      player.say(`<white>${nouns[key]}</white>`);
      return true;
    }
  }
};
