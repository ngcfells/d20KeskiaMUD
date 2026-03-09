// path: bundles/my-d20-bundle/scripts/npcs/martha.js
'use strict';

module.exports = {
  listeners: {

    // --- Spawn Logic: Apply Ghostly Tether ---
    spawned: state => function () {
      const npc = this;

      if (state.EffectFactory.has('ghostly_tether')) {
        const tether = state.EffectFactory.create('ghostly_tether', {});
        npc.addEffect(tether);
      }

      // First-time dialogue after bar is lifted (Room 11 handles trigger)
      if (!npc.getMeta('initial_dialogue_triggered')) {
        npc.setMeta('initial_dialogue_triggered', true);

        setTimeout(() => {
          npc.say("<cyan>“...thank you. I have been trapped in that silence for so long.”</cyan>");
        }, 1500);
      }
    },

    // --- Dialogue Tree ---
    command: state => function (commandName, args, player) {
      if (commandName !== 'ask' && commandName !== 'talk') return;

      const npc = this;
      const topic = args ? args.toLowerCase() : '';

      // General / self
      if (!topic || topic.includes('martha') || topic.includes('you')) {
        npc.say("<cyan>“I was a penitent here… long ago. Silence was my vow, but it became my prison.”</cyan>");
        return true;
      }

      if (topic.includes('silence')) {
        npc.say("<cyan>“The silence was not holy. It was a cage woven by Valerius to keep me from warning others.”</cyan>");
        return true;
      }

      if (topic.includes('confessional') || topic.includes('booth')) {
        npc.say("<cyan>“I begged for release, but the priests feared what I had seen. They sealed me inside.”</cyan>");
        return true;
      }

      if (topic.includes('valerius')) {
        npc.say("<magenta>“Valerius… the Abbot. He traded his heart for power. His phylactery lies cracked, but not broken.”</magenta>");
        player.setMeta('valerius_lore_unlocked', true);
        return true;
      }

      if (topic.includes('ossuary')) {
        npc.say("<cyan>“This place was once a sanctuary. Now it is a tomb of echoes and regrets.”</cyan>");
        return true;
      }

      if (topic.includes('death')) {
        npc.say("<cyan>“I died alone in the dark. But you… you gave me a voice again.”</cyan>");
        return true;
      }

      if (topic.includes('bell')) {
        npc.say("<yellow>“The bell above… it can shatter the silence. It can wound Valerius.”</yellow>");
        return true;
      }

      if (topic.includes('tether') || topic.includes('bound')) {
        npc.say("<cyan>“My soul is tied to this room. Break the tether, and I may finally rest.”</cyan>");
        return true;
      }

      npc.say("<white>She tilts her head, unable to answer that.</white>");
      return true;
    },

    // --- Passive Fear Aura ---
    updateTick: state => function () {
      const npc = this;
      const room = npc.room;

      if (!room || room.players.size === 0) return;

      for (const player of room.players) {
        if (Math.random() < 0.05 && !player.hasEffect('shaken')) {

          const dc = state.DCTables.getDC("will", ["cthulhu", "fear"], "minor") || 12;
          const will = player.getAttribute('will') || 0;
          const roll = Math.floor(Math.random() * 20) + 1;

          player.say(`<white>[ Will Save vs Fear: ${roll} + ${will} vs DC ${dc} ]</white>`);

          if (roll + will < dc) {
            player.say("<magenta>A chill passes through you as Martha’s sorrow brushes your soul.</magenta>");

            if (state.EffectFactory.has('shaken')) {
              const shaken = state.EffectFactory.create('shaken', { duration: 30000 });
              player.addEffect(shaken);
            }
          }
        }
      }
    },

    // --- Hostile Conversion ---
    damaged: state => function (damage, attacker) {
      const npc = this;

      if (!npc.getMeta('hostile')) {
        npc.setMeta('hostile', true);
        npc.say("<red>“Please… don’t make me relive this…”</red>");
        npc.initiateCombat(attacker);
      }
    },

    // --- Hostile Combat AI ---
    combatRound: state => function () {
      const npc = this;

      // Ghostly touch flavor
      if (Math.random() < 0.5) {
        npc.say("<magenta>Martha reaches out with a trembling, spectral hand.</magenta>");
      }

      // Intensified fear aura
      for (const player of npc.room.players) {
        if (!player.hasEffect('shaken') && Math.random() < 0.2) {
          const dc = 14;
          const will = player.getAttribute('will') || 0;
          const roll = Math.floor(Math.random() * 20) + 1;

          if (roll + will < dc) {
            const shaken = state.EffectFactory.create('shaken', { duration: 30000 });
            player.addEffect(shaken);
          }
        }
      }
    },

    // --- Release Cinematic ---
    freed: state => function (player) {
      const npc = this;

      npc.say("<cyan>“The silence is broken… I can feel the wind again.”</cyan>");

      setTimeout(() => {
        npc.say("<yellow>“Listen well. Valerius hides his heart in the Deep Reliquary. Strike it when the bell tolls.”</yellow>");
      }, 2000);

      setTimeout(() => {
        npc.say("<magenta>“Thank you… I go to my rest.”</magenta>");
        npc.kill();
      }, 5000);
    },

    // --- Death / Exorcism ---
    deathblow: state => function (player) {
      const npc = this;

      npc.say("<cyan>“Thank you… I am finally free…”</cyan>");

      if (state.EffectFactory.has('blessing_of_rest')) {
        const bless = state.EffectFactory.create('blessing_of_rest', {});
        player.addEffect(bless);
      }
    }
  }
};
