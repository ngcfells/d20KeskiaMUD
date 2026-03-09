// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/43.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      // Bone shifting
      if (Math.random() < 0.07) {
        room.broadcast("<white>The bones underfoot shift and slide, rattling like dry hail.</white>");
      }

      // Swarm stir
      if (Math.random() < 0.04) {
        room.broadcast("<magenta>Something skitters just beneath the surface of the bone pile.</magenta>");
      }
    },

    playerEnter: state => player => {
      player.say("<white>The floor of bones shifts treacherously beneath your weight.</white>");
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = [
        'examine','look','touch','feel','smell','sniff','taste','listen','search','wade','dig'
      ];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        bones: "Countless bones—ribs, femurs, skull fragments—shift and clatter with every movement.",
        floor: "There is no solid floor, only a deep layer of loose, treacherous remains.",
        marrow: "A faint, chalky smell of old marrow hangs in the air, dry and unsettling.",
        cavern: "The cavern walls rise steeply, stained with the dust of long-decayed bodies."
      };

      // LISTEN
      if (commandName === 'listen') {
        player.say("<white>You hear the constant, faint clatter of bones settling, and something smaller moving within.</white>");
        return true;
      }

      // SMELL
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The air smells dry and chalky, like ground bone and old dust.</white>");
        return true;
      }

      // TASTE
      if (commandName === 'taste') {
        player.say("<red>A bit of bone dust gets in your mouth. It is bitter and horribly dry.</red>");
        player.mutateAttribute('sanity', -1);
        return true;
      }

      // WADE — risk of falling / minor damage
      if (commandName === 'wade' && (target.includes('bones') || !target)) {
        player.say("<yellow>You push your way through the shifting bone field...</yellow>");

        if (Math.random() < 0.4) {
          player.say("<red>Your foot slips and you go down hard, bones jabbing into your side.</red>");
          player.mutateAttribute('health', -3);
        } else {
          player.say("<green>You manage to keep your footing, though every step feels precarious.</green>");
        }
        return true;
      }

      // DIG — chance to find loot, chance to stir swarm
      if (commandName === 'dig' || (commandName === 'search' && target.includes('bones'))) {
        const perception = player.getSkill?.('perception') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 16;

        player.say("<yellow>You dig into the bone pile, pushing aside ribs and skull fragments...</yellow>");

        // Chance to spawn or aggro bone rat swarm
        if (Math.random() < 0.25) {
          const swarm = state.MobManager.create(room.area, 'ossuary:bone_rat_swarm');
          if (swarm) {
            swarm.moveTo(room);
            swarm.initiateCombat(player);
            room.broadcast("<red>The bones erupt as a swarm of bone rats bursts forth!</red>");
            return true;
          }
        }

        if (roll >= dc && !room.getMeta('bone_pit_loot_found')) {
          room.setMeta('bone_pit_loot_found', true);
          player.say("<green>You uncover a small funerary charm tangled in a ribcage.</green>");
          const charm = state.ItemManager.create(room.area, 'ossuary:funerary_charm');
          charm && charm.moveTo(player);
        } else {
          player.say("<white>Your hands find only more bones.</white>");
        }
        return true;
      }

      // SEARCH (generic)
      if (commandName === 'search') {
        player.say("<white>There is nothing here but bones upon bones.</white>");
        return true;
      }

      // SENSORY INTERACTIONS
      if (!target) return false;
      const key = Object.keys(nouns).find(k => target.includes(k));
      if (!key) return false;

      switch (commandName) {
        case 'touch':
        case 'feel':
          player.say(`<yellow>The bones shift under your hand. ${nouns[key]}</yellow>`);
          return true;
        default:
          player.say(`<white>${nouns[key]}</white>`);
          return true;
      }
    }
  }
};
