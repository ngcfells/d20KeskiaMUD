// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/44.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      // Holy radiance pulse
      if (Math.random() < 0.06) {
        room.broadcast("<cyan>A gentle radiance swells and then fades, pushing back every trace of darkness.</cyan>");
      }

      // Anti-magic hum
      if (Math.random() < 0.04) {
        room.broadcast("<white>The air hums softly, and any lingering magical effects feel strangely muted.</white>");
      }
    },

    playerEnter: state => player => {
      player.say("<cyan>A calm, protective presence settles over you as you step into the crypt.</cyan>");
      player.mutateAttribute && player.mutateAttribute('sanity', 2);
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = [
        'examine','look','touch','feel','smell','sniff','taste','listen','search','pray','kneel','drink'
      ];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        sarcophagus: "The marble sarcophagus is flawless, etched with scenes of blessing and pilgrimage.",
        lid: "The lid bears the image of a robed figure at rest, hands folded over a stone lantern.",
        goblet: "The silver goblet is polished to a mirror sheen, untouched by tarnish or dust.",
        radiance: "A soft, holy glow suffuses the room, pushing back the shadows without a visible source.",
        air: "The air feels calm and safe, and any attempt to summon magic seems to falter here."
      };

      // LISTEN
      if (commandName === 'listen') {
        player.say("<white>You hear only your own breathing and a faint, soothing hum in the air.</white>");
        return true;
      }

      // SMELL
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The air smells faintly of incense and clean stone.</white>");
        return true;
      }

      // SEARCH — find a minor relic if not already taken
      if (commandName === 'search') {
        const perception = player.getSkill?.('perception') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 15;

        player.say("<yellow>You carefully inspect the sarcophagus and the surrounding platform...</yellow>");

        if (roll >= dc && !room.getMeta('arch_priest_relic_found')) {
          room.setMeta('arch_priest_relic_found', true);
          player.say("<green>You find a small, silver holy symbol tucked beneath the goblet.</green>");
          const relic = state.ItemManager.create(room.area, 'ossuary:holy_symbol_arch_priest');
          relic && relic.moveTo(player);
        } else {
          player.say("<white>You find nothing beyond the obvious sanctity of the place.</white>");
        }
        return true;
      }

      // PRAY / KNEEL — small boon, sanity restore
      if ((commandName === 'pray' || commandName === 'kneel') &&
          (target.includes('sarcophagus') || target.includes('altar') || !target)) {

        player.say("<cyan>You kneel and offer a quiet prayer to the long-departed arch-priest.</cyan>");
        player.mutateAttribute && player.mutateAttribute('sanity', 3);
        player.mutateAttribute && player.mutateAttribute('health', 2);
        return true;
      }

      // DRINK from goblet — small healing, but only once
      if (commandName === 'drink' && target.includes('goblet')) {
        if (room.getMeta('goblet_emptied')) {
          player.say("<white>The goblet is dry. Whatever blessing it held has already been spent.</white>");
          return true;
        }

        room.setMeta('goblet_emptied', true);
        player.say("<cyan>You sip from the goblet. The liquid is cool and impossibly pure.</cyan>");
        player.mutateAttribute && player.mutateAttribute('health', 5);
        player.mutateAttribute && player.mutateAttribute('sanity', 5);
        return true;
      }

      // SENSORY INTERACTIONS
      if (!target) return false;
      const key = Object.keys(nouns).find(k => target.includes(k));
      if (!key) return false;

      switch (commandName) {
        case 'touch':
        case 'feel':
          player.say(`<yellow>Your fingers brush the ${key}. ${nouns[key]}</yellow>`);
          return true;
        case 'taste':
          if (target.includes('goblet')) {
            player.say("<white>You taste a lingering hint of something clean and bright, like melted snow.</white>");
          } else {
            player.say("<white>You taste dust and stone. Nothing more.</white>");
          }
          return true;
        default:
          player.say(`<white>${nouns[key]}</white>`);
          return true;
      }
    }
  }
};
