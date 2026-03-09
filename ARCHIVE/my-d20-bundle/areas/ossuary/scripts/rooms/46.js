// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/46.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      // Lava heat pulse
      if (Math.random() < 0.06) {
        room.broadcast("<red>A wave of blistering heat rises from the glowing fissures.</red>");
        room.players.forEach(p => {
          p.mutateAttribute && p.mutateAttribute('health', -1);
        });
      }

      // Air distortion
      if (Math.random() < 0.05) {
        room.broadcast("<yellow>The air ripples with heat distortion, making the walls waver like a mirage.</yellow>");
      }

      // Fissure crack hazard
      if (Math.random() < 0.04) {
        room.broadcast("<white>A fissure cracks wider with a sharp pop, spraying sparks.</white>");
      }
    },

    playerEnter: state => player => {
      player.say("<red>The suffocating heat hits you like a wall as you step onto the fractured stone.</red>");
      player.mutateAttribute && player.mutateAttribute('sanity', -1);
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = [
        'examine','look','touch','feel','smell','sniff','taste','listen','search','jump','leap'
      ];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        fissures: "Jagged fissures split the stone, their depths glowing with molten rock.",
        lava: "Far below, molten rock churns and bubbles, radiating brutal, suffocating heat.",
        heat: "The heat presses against your skin and lungs, making sweat bead instantly.",
        walls: "The walls are scorched and cracked, stained with soot and mineral deposits.",
        floor: "The fractured floor forces careful, deliberate steps to avoid the glowing cracks."
      };

      // LISTEN
      if (commandName === 'listen') {
        player.say("<white>You hear the distant roar of molten rock and the crackle of superheated stone.</white>");
        return true;
      }

      // SMELL
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The air smells of sulfur, scorched stone, and burning minerals.</white>");
        return true;
      }

      // TASTE
      if (commandName === 'taste') {
        player.say("<white>The air tastes acrid and metallic, like hot iron.</white>");
        return true;
      }

      // SEARCH — find heat‑tempered shard
      if (commandName === 'search') {
        const perception = player.getSkill?.('perception') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 16;

        player.say("<yellow>You search the fractured stone, careful to avoid the glowing fissures...</yellow>");

        if (roll >= dc && !room.getMeta('lava_shard_found')) {
          room.setMeta('lava_shard_found', true);
          player.say("<green>You find a small shard of heat-tempered obsidian near a cooled crack.</green>");
          const shard = state.ItemManager.create(room.area, 'ossuary:obsidian_shard');
          shard && shard.moveTo(player);
        } else {
          player.say("<white>The heat makes it difficult to focus, and you find nothing.</white>");
        }
        return true;
      }

      // JUMP / LEAP — avoid fissure hazard
      if ((commandName === 'jump' || commandName === 'leap') &&
          (target.includes('fissure') || target.includes('crack') || !target)) {

        player.say("<yellow>You leap over a glowing fissure...</yellow>");

        if (Math.random() < 0.3) {
          player.say("<red>You misjudge the distance and your boot grazes the molten edge!</red>");
          player.mutateAttribute('health', -4);
        } else {
          player.say("<green>You land safely on solid stone.</green>");
        }
        return true;
      }

      // TOUCH — lava hazard
      if ((commandName === 'touch' || commandName === 'feel') && target.includes('lava')) {
        player.say("<red>You reach toward the molten rock. The heat sears your skin instantly!</red>");
        player.mutateAttribute('health', -5);
        return true;
      }

      // TOUCH — fissures
      if ((commandName === 'touch' || commandName === 'feel') && target.includes('fissure')) {
        player.say("<red>The stone near the fissure is scorching hot. You jerk your hand back.</red>");
        player.mutateAttribute('health', -2);
        return true;
      }

      // Fire Mephit reaction
      if (target.includes('mephit') && ['examine','look'].includes(commandName)) {
        player.say("<white>The fire mephit crackles with heat, its wings shedding sparks.</white>");
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
