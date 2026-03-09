// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/48.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      // Briar pulse
      if (Math.random() < 0.06) {
        room.broadcast("<red>The Abyssal briars pulse, their thorns glistening with fresh, dark fluid.</red>");
      }

      // Negative energy drain
      if (Math.random() < 0.05) {
        room.players.forEach(p => {
          p.say("<magenta>A wave of oppressive energy presses against your mind.</magenta>");
          p.mutateAttribute && p.mutateAttribute('sanity', -1);
        });
      }

      // Thorn twitch
      if (Math.random() < 0.04) {
        room.broadcast("<white>The vines twitch subtly, as though tasting the air.</white>");
      }
    },

    playerEnter: state => player => {
      player.say("<white>The briars rustle as you enter, their thorns seeming to follow your movements.</white>");
      player.mutateAttribute && player.mutateAttribute('sanity', -1);
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = [
        'examine','look','touch','feel','smell','sniff','taste','listen','search','cut','hack','burn'
      ];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        briars: "Thick, black vines coil across the passage, their surfaces slick and pulsing with inner life.",
        thorns: "The thorns are long and glassy, each one tipped with a bead of dark, viscous fluid.",
        vines: "The vines twitch and flex in slow, unsettling rhythms, as if tasting the air.",
        heartbeat: "A faint, rhythmic thrum pulses through the briars, echoing like a distant heartbeat.",
        air: "The air feels heavy and hostile, prickling against your skin with unseen malice."
      };

      // LISTEN
      if (commandName === 'listen') {
        player.say("<white>You hear a faint, rhythmic thrum—like a heartbeat buried in the vines.</white>");
        return true;
      }

      // SMELL
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The air smells of rot, sap, and something faintly metallic.</white>");
        return true;
      }

      // TASTE (ill-advised)
      if (commandName === 'taste' && target.includes('thorn')) {
        player.say("<red>You taste the dark fluid. A burning numbness spreads across your tongue!</red>");
        player.mutateAttribute('health', -3);
        player.mutateAttribute('sanity', -2);
        return true;
      }

      // TOUCH — thorn damage
      if ((commandName === 'touch' || commandName === 'feel') &&
          (target.includes('briar') || target.includes('thorn') || target.includes('vine'))) {

        player.say("<red>A thorn pierces your skin! The wound burns with unnatural heat.</red>");
        player.mutateAttribute('health', -3);

        // Chance to apply negative energy drain
        if (Math.random() < 0.25 && state.EffectFactory.has('negative_energy_drain')) {
          const effect = state.EffectFactory.create('negative_energy_drain', {});
          player.addEffect(effect);
        }
        return true;
      }

      // CUT / HACK — attempt to clear briars
      if ((commandName === 'cut' || commandName === 'hack') &&
          (target.includes('briar') || target.includes('vine'))) {

        const strength = player.getAttribute?.('strength') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + Math.floor((strength - 10) / 2);
        const dc = 16;

        player.say("<yellow>You swing at the briars, trying to carve a safer path...</yellow>");

        if (roll >= dc) {
          player.say("<green>You slice away a few of the vines, creating a small gap.</green>");
          room.setMeta('briars_cut', true);
        } else {
          player.say("<red>The vines recoil and lash out, cutting your arms!</red>");
          player.mutateAttribute('health', -4);
        }
        return true;
      }

      // BURN — attempt to scorch briars
      if (commandName === 'burn' && target.includes('briar')) {
        player.say("<yellow>You attempt to burn the briars...</yellow>");

        if (Math.random() < 0.5) {
          player.say("<green>The vines shrivel away from the flame, leaving a charred gap.</green>");
          room.setMeta('briars_burned', true);
        } else {
          player.say("<red>The briars recoil and then surge forward, lashing your hands!</red>");
          player.mutateAttribute('health', -3);
        }
        return true;
      }

      // SEARCH — find thorn sample
      if (commandName === 'search') {
        const perception = player.getSkill?.('perception') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 15;

        player.say("<yellow>You carefully search the briars, avoiding the worst of the thorns...</yellow>");

        if (roll >= dc && !room.getMeta('thorn_sample_found')) {
          room.setMeta('thorn_sample_found', true);
          player.say("<green>You find a hardened thorn cluster that seems safe to handle.</green>");
          const thorn = state.ItemManager.create(room.area, 'ossuary:abyssal_thorn_cluster');
          thorn && thorn.moveTo(player);
        } else {
          player.say("<white>You find nothing but more writhing vines.</white>");
        }
        return true;
      }

      // SENSORY INTERACTIONS FOR OTHER NOUNS
      if (!target) return false;
      const key = Object.keys(nouns).find(k => target.includes(k));
      if (!key) return false;

      player.say(`<white>${nouns[key]}</white>`);
      return true;
    }
  }
};
