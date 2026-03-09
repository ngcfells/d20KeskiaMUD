// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/39.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      // Ambient shadow movement
      if (Math.random() < 0.06) {
        room.broadcast("<magenta>The shadows between the broken chests seem to slither and reform.</magenta>");
      }

      // Sanity pressure
      if (Math.random() < 0.04) {
        room.players.forEach(p => {
          p.say("<white>A cold dread brushes your spine, as if unseen eyes weigh your worth.</white>");
          p.mutateAttribute && p.mutateAttribute('sanity', -1);
        });
      }
    },

    playerEnter: state => player => {
      player.say("<white>The darkness here feels thick and watchful, clinging to the edges of your vision.</white>");
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = [
        'examine','look','touch','feel','smell','sniff','taste','listen','search','open','kick'
      ];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        lockboxes: "Heavy iron lockboxes lie overturned, their lids twisted open by brute force.",
        lockbox: "This lockbox bears a faint engraving of a lantern and open hands—symbol of humble offerings.",
        chests: "Splintered wooden chests lie scattered, their contents long since plundered.",
        chest: "The nearest chest is cracked open, its interior scraped clean.",
        bowls: "Ceramic donation bowls lie shattered, their fragments scattered like broken teeth.",
        darkness: "The shadows cling unnaturally to the corners, reluctant to yield their secrets."
      };

      // LISTEN
      if (commandName === 'listen') {
        player.say("<white>You hear faint scraping… or perhaps just your imagination.</white>");
        return true;
      }

      // SMELL
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The air smells of dust, old wood, and something faintly metallic.</white>");
        return true;
      }

      // SEARCH — find hidden tithe coin or trigger shadow attack
      if (commandName === 'search') {
        const perception = player.getSkill?.('perception') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 15;

        player.say("<yellow>You sift through the broken containers and scattered debris...</yellow>");

        // Shadow ambush chance
        if (Math.random() < 0.15) {
          const shadow = state.MobManager.create(room.area, 'ossuary:shadow');
          if (shadow) {
            shadow.moveTo(room);
            shadow.initiateCombat(player);
            room.broadcast("<red>A shadow peels itself from the wall and lunges!</red>");
            return true;
          }
        }

        if (roll >= dc && !room.getMeta('tithe_loot_found')) {
          room.setMeta('tithe_loot_found', true);
          player.say("<green>You find a single gold coin wedged beneath a shattered bowl.</green>");
          const coin = state.ItemManager.create(room.area, 'ossuary:gold_coins');
          coin && coin.moveTo(player);
        } else {
          player.say("<white>Your hands brush only dust and splinters.</white>");
        }
        return true;
      }

      // OPEN / KICK containers
      if ((commandName === 'open' || commandName === 'kick') &&
          (target.includes('chest') || target.includes('lockbox'))) {

        player.say("<yellow>You jostle the ruined container...</yellow>");

        if (Math.random() < 0.2) {
          player.say("<red>A jagged splinter cuts your hand.</red>");
          player.mutateAttribute('health', -1);
        } else {
          player.say("<white>It’s completely empty.</white>");
        }
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
          player.say("<white>You taste dust and stale air. Nothing more.</white>");
          return true;
        default:
          player.say(`<white>${nouns[key]}</white>`);
          return true;
      }
    }
  }
};
