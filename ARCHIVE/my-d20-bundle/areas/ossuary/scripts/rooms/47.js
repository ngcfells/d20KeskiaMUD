// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/47.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      // Spectral murmurs
      if (Math.random() < 0.06) {
        room.broadcast("<magenta>The spectral council leans together, whispering judgments you cannot hear.</magenta>");
      }

      // Wild magic flicker
      if (Math.random() < 0.05) {
        room.broadcast("<cyan>The air ripples with unstable magic, bending light into strange, wavering patterns.</cyan>");
        room.players.forEach(p => {
          if (Math.random() < 0.25) {
            p.say("<yellow>You feel a brief surge of arcane static crawl across your skin.</yellow>");
            p.mutateAttribute && p.mutateAttribute('sanity', -1);
          }
        });
      }

      // Judge attention
      if (Math.random() < 0.04) {
        room.broadcast("<white>One of the spectral judges turns its hollow gaze toward you, weighing your soul.</white>");
      }
    },

    playerEnter: state => player => {
      const corruption = player.getAttribute('corruption') || 0;
      const gem = player.inventory?.find(i => i.id.includes('pilgrim_eye_gem'));

      player.say("<white>The air crackles with judgment as you enter the hall.</white>");

      // Corruption or cursed gem triggers judge hostility
      if (corruption > 5 || (gem && gem.getMeta('eye_state') === 'cursed')) {
        player.say("<red>A spectral judge rises abruptly, pointing a translucent finger at you.</red>");
        player.say("<red>'THIEF. DESECRATOR. THE WEIGHT OF YOUR GREED ANCHORS YOU TO THE DARK.'</red>");

        // If judge NPC is present, it becomes hostile
        const room = player.room;
        const judge = [...room.npcs].find(n => n.id.includes('spectral_judge'));
        if (judge) {
          judge.initiateCombat && judge.initiateCombat(player);
        }
      } else {
        player.say("<cyan>The spectral council acknowledges you with a faint, flickering nod.</cyan>");
      }
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = [
        'examine','look','touch','feel','smell','sniff','taste','listen','search',
        'kneel','pray','address','speak','ask'
      ];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        chairs: "High-backed stone chairs form two facing rows, like a tribunal frozen in session.",
        chair: "The nearest chair is carved from a single block of stone, its surface cold and smooth.",
        council: "The spectral council members are robed and severe, their faces blurred by flickering light.",
        judge: "The judge nearest you flickers like a candle flame, its expression unreadable.",
        judges: "The judges lean toward one another, whispering silent verdicts.",
        specters: "The specters seem half-present, as if they exist more in memory than in spirit.",
        magic: "The air shimmers with unstable magic, bending light and sound in unsettling ways.",
        judgments: "Though you cannot hear their words, you feel weighed and measured by their silent debate."
      };

      // LISTEN
      if (commandName === 'listen') {
        player.say("<white>You hear faint whispers—too soft to understand, yet heavy with meaning.</white>");
        return true;
      }

      // SMELL
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The air smells of cold stone and something faintly metallic, like old magic.</white>");
        return true;
      }

      // TASTE
      if (commandName === 'taste') {
        player.say("<white>The air tastes sharp, like ozone before a storm.</white>");
        return true;
      }

      // SEARCH — find hidden inscription
      if (commandName === 'search') {
        const perception = player.getSkill?.('perception') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 17;

        player.say("<yellow>You search the stone chairs and the floor between them...</yellow>");

        if (roll >= dc && !room.getMeta('judgment_inscription_found')) {
          room.setMeta('judgment_inscription_found', true);
          player.say("<green>You find a faint inscription carved beneath one chair: 'THE PURE NEED NOT FEAR THE GAZE.'</green>");
          player.mutateAttribute && player.mutateAttribute('sanity', 1);
        } else {
          player.say("<white>Your fingers trace only cold stone.</white>");
        }
        return true;
      }

      // PRAY / KNEEL — sanity check, possible boon or backlash
      if ((commandName === 'pray' || commandName === 'kneel') &&
          (target.includes('judge') || target.includes('council') || !target)) {

        const will = player.getAttribute?.('will') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + will;
        const dc = 15;

        player.say("<yellow>You kneel before the spectral council, offering a silent plea...</yellow>");

        if (roll >= dc) {
          player.say("<cyan>A soft glow surrounds you. The judges acknowledge your humility.</cyan>");
          player.mutateAttribute('sanity', 2);
        } else {
          player.say("<red>The judges recoil. A wave of cold judgment crashes over your mind.</red>");
          player.mutateAttribute('sanity', -3);
        }
        return true;
      }

      // ADDRESS / SPEAK / ASK — judge responds based on corruption
      if (['address','speak','ask'].includes(commandName)) {
        const corruption = player.getAttribute('corruption') || 0;

        if (corruption > 5) {
          player.say("<red>The nearest judge hisses: 'THE CORRUPT HAVE NO VOICE HERE.'</red>");
          player.mutateAttribute('sanity', -2);
        } else {
          player.say("<cyan>A judge inclines its head: 'THE PATH OF LIGHT REMAINS OPEN TO YOU.'</cyan>");
          player.mutateAttribute('sanity', 1);
        }
        return true;
      }

      // TOUCH — spectral cold
      if ((commandName === 'touch' || commandName === 'feel') &&
          (target.includes('judge') || target.includes('specter'))) {

        player.say("<red>Your hand passes through the specter. A freezing numbness spreads up your arm.</red>");
        player.mutateAttribute('health', -1);
        player.mutateAttribute('sanity', -1);
        return true;
      }

      // SENSORY INTERACTIONS FOR ALL OTHER NOUNS
      if (!target) return false;
      const key = Object.keys(nouns).find(k => target.includes(k));
      if (!key) return false;

      switch (commandName) {
        case 'touch':
        case 'feel':
          player.say(`<yellow>Your fingers brush the ${key}. ${nouns[key]}</yellow>`);
          return true;
        default:
          player.say(`<white>${nouns[key]}</white>`);
          return true;
      }
    }
  }
};
