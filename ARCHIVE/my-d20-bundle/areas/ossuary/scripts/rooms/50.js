// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/50.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      // Portal shimmer
      if (Math.random() < 0.06) {
        room.broadcast("<cyan>The silver pool ripples, casting shifting reflections across the chamber.</cyan>");
      }

      // Positive energy pulse
      if (Math.random() < 0.05) {
        room.players.forEach(p => {
          p.say("<white>A soothing warmth washes over you.</white>");
          p.mutateAttribute && p.mutateAttribute('sanity', 1);
        });
      }
    },

    playerEnter: state => player => {
      player.say("<white>The cool, sweet air of the portal chamber soothes your senses.</white>");
      player.mutateAttribute && player.mutateAttribute('sanity', 1);
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = [
        'examine','look','touch','feel','smell','sniff','taste','listen','search','enter','step','drink'
      ];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        pool: "The pool is perfectly still at its center, its edges rippling with soft, silver light.",
        water: "The liquid looks like water but moves like liquid moonlight, cool and impossibly clean.",
        light: "Silver light rises from the pool, painting the walls with soft, shifting reflections.",
        air: "The air is crisp and sweet, carrying the faint scent of rain on stone.",
        portal: "The pool feels less like water and more like a doorway waiting to be stepped through."
      };

      // LISTEN
      if (commandName === 'listen') {
        player.say("<white>You hear a faint, melodic hum emanating from the pool.</white>");
        return true;
      }

      // SMELL
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The air smells clean and fresh, like rain after a long drought.</white>");
        return true;
      }

      // TASTE
      if (commandName === 'taste' && target.includes('water')) {
        player.say("<cyan>The liquid tastes pure and cool, filling you with a sense of peace.</cyan>");
        player.mutateAttribute('sanity', 2);
        return true;
      }

      // SEARCH — find portal inscription
      if (commandName === 'search') {
        const perception = player.getSkill?.('perception') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 14;

        player.say("<yellow>You search the edges of the pool and the surrounding stone...</yellow>");

        if (roll >= dc && !room.getMeta('portal_inscription_found')) {
          room.setMeta('portal_inscription_found', true);
          player.say("<green>You find a faint inscription: 'ASCEND WITH A PURE HEART.'</green>");
        } else {
          player.say("<white>You find nothing beyond the serene beauty of the chamber.</white>");
        }
        return true;
      }

      // DRINK — healing effect
      if (commandName === 'drink' && target.includes('water')) {
        player.say("<cyan>You cup your hands and drink from the pool. A gentle warmth spreads through your body.</cyan>");
        player.mutateAttribute('health', 5);
        player.mutateAttribute('sanity', 3);
        return true;
      }

      // ENTER / STEP — teleport to world hub
      if ((commandName === 'enter' || commandName === 'step') &&
          (target.includes('pool') || target.includes('portal') || !target)) {

        player.say("<cyan>You step into the shimmering pool. Light envelops you...</cyan>");

        const dest = state.RoomManager.getRoom('world_hub:town_square');
        if (dest) {
          player.moveTo(dest);
          dest.emit('playerEnter', player);
        }
        return true;
      }

      // TOUCH — harmless
      if ((commandName === 'touch' || commandName === 'feel') &&
          (target.includes('pool') || target.includes('water'))) {

        player.say("<white>Your hand passes through the liquid moonlight. It feels cool and soothing.</white>");
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
