// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/36.js
'use strict';

module.exports = {
  listeners: {
    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      if (Math.random() < 0.05) {
        room.broadcast("<cyan>The mosaic saint’s lantern seems to glow brighter, pushing back the memory of the lower crypts.</cyan>");
      }

      if (Math.random() < 0.03) {
        room.broadcast("<white>A gentle warmth settles over you, easing aches you didn’t know you carried.</white>");
        room.players.forEach(p => {
          p.mutateAttribute('health', 1);
          p.mutateAttribute('sanity', 1);
        });
      }
    },

    playerEnter: state => player => {
      player.say("<cyan>A sense of calm washes over you as you step into the Great Crossing.</cyan>");
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = ['examine', 'look', 'touch', 'feel', 'smell', 'sniff', 'taste', 'listen', 'search'];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        mosaic: "Tiny tiles of gold, white, and deep blue form the image of a serene saint, lantern raised in blessing.",
        floor: "The polished marble floor reflects the mosaic’s light like still water.",
        saint: "The saint’s expression is calm and watchful, a silent promise of guidance to all who pass.",
        lantern: "The golden lantern in the mosaic seems almost alive with inner light.",
        dome: "The domed ceiling gathers and amplifies every glimmer, making the hall feel larger than it is.",
        ceiling: "The ceiling’s smooth stone curves overhead, unmarred by cracks or soot.",
        light: "The light here feels gentle and clean, as if it has never known the depths below."
      };

      // SEARCH / LORE HOOK
      if (commandName === 'search') {
        const perception = player.getSkill ? (player.getSkill('perception') || 0) : 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 15;

        player.say("<yellow>You carefully search the mosaic and the edges of the hall...</yellow>");

        if (roll >= dc && !room.getMeta('found_crossing_lore')) {
          room.setMeta('found_crossing_lore', true);
          player.say("<green>You notice a tiny inscription at the edge of the mosaic: ‘All paths return to the light.’</green>");
          player.mutateAttribute && player.mutateAttribute('sanity', 1);
        } else {
          player.say("<white>You find nothing beyond the obvious beauty of the hall.</white>");
        }
        return true;
      }

      if (!target) return false;

      const key = Object.keys(nouns).find(k => target.includes(k));
      if (!key) return false;

      switch (commandName) {
        case 'touch':
        case 'feel':
          player.say(`<yellow>You run your fingers over the ${key}. ${nouns[key]}</yellow>`);
          return true;
        case 'smell':
        case 'sniff':
          player.say("<white>The air smells faintly of old incense and cool stone.</white>");
          return true;
        case 'taste':
          player.say("<white>You taste dust and stone on the air—nothing more.</white>");
          return true;
        case 'listen':
          player.say("<white>The hall is quiet, but the silence feels protective rather than hostile.</white>");
          return true;
        default: // examine/look
          player.say(`<white>${nouns[key]}</white>`);
          return true;
      }
    }
  }
};
