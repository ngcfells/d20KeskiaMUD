// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/1.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => function () {
      const room = this;
      if (room.players.size === 0) return;

      // --- Rain Ambience (10%) ---
      if (Math.random() < 0.1) {
        const echoes = [
          "Rain splatters against the granite archway, scattering droplets across the floor.",
          "A distant roll of thunder trembles through the stones, subtle but unmistakable.",
          "Wind threads through the collapsed ceiling, carrying cold droplets in erratic spirals."
        ];
        room.broadcast(`<blue>${echoes[Math.floor(Math.random() * echoes.length)]}</blue>`);
      }

      // ---------------------------------------------------------------------
      // --- Wandering Mob Spawn (Restless Acolyte) ---
      // Starter-area friendly, low threat, 35s cooldown
      // ---------------------------------------------------------------------
      if (!room.getMeta('spawn_cooldown')) {
        // 5% chance per tick
        if (Math.random() < 0.05) {
          const mob = state.MobFactory.create(room.area, 'ossuary:restless_acolyte');
          if (mob) {
            mob.hydrate(state);
            mob.moveTo(room);

            room.broadcast("<gray>A restless acolyte shuffles into view, robes dripping with cold rainwater.</gray>");

            // Prevent rapid respawn
            room.setMeta('spawn_cooldown', true);
            setTimeout(() => room.setMeta('spawn_cooldown', false), 35000);
          }
        }
      }
      // ---------------------------------------------------------------------
    },

    playerEnter: state => function (player) {
      player.say("<white>The scent of wet stone drifts through the archway, mingling with the faint musk of old dust.</white>");

      // FORCE‑SENSITIVE HOOK (FS‑2 threshold)
      if (player.getMeta('is_force_sensitive') === true) {
        player.say("<cyan>The Force stirs faintly here, as though acknowledging the boundary you’ve crossed.</cyan>");
      }

      // PSIONIC EMPATH HOOK
      if (player.getMeta('is_psionic_empath') === true) {
        player.say("<magenta>A faint emotional imprint clings to the stones — a quiet echo of passage, neither warm nor cold.</magenta>");
      }
    },

    command: state => function (commandName, args, player) {
      const room = this;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = ['look','examine','touch','feel','smell','sniff','taste','listen','search'];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        archway: "The granite archway rises in a graceful curve, its surface worn smooth by time and weather.",
        ceiling: "The collapsed ceiling reveals a jagged aperture through which rain and wind descend.",
        stones: "The stones glisten with moisture, each one bearing the marks of long‑forgotten hands.",
        water: "Cold droplets gather in shallow pools, rippling with each new fall of rain.",
        wind: "The wind threads through the chamber in uneven breaths, carrying the scent of distant storms."
      };

      // LISTEN
      if (commandName === 'listen') {
        player.say("<white>Rain patters across stone and broken ceiling, a shifting cadence without pattern.</white>");
        return true;
      }

      // SMELL
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The air smells of rain‑soaked granite and the faint musk of old dust.</white>");
        return true;
      }

      // TASTE
      if (commandName === 'taste') {
        player.say("<white>Moisture gathers on your lips, cool and mineral‑sharp.</white>");
        return true;
      }

      // SEARCH
      if (commandName === 'search') {
        player.say("<yellow>You search the archway and the scattered stones...</yellow>");
        player.say("<white>No hidden markings reveal themselves.</white>");
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
