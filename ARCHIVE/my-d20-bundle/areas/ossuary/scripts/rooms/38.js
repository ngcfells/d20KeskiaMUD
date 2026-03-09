// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/38.js
'use strict';

module.exports = {
  listeners: {
    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      if (Math.random() < 0.06) {
        room.broadcast("<cyan>The golden censer swings gently, sending a fresh wave of sweet-smelling smoke through the chamber.</cyan>");
      }

      if (Math.random() < 0.04) {
        room.players.forEach(p => {
          p.say("<white>You inhale the incense and feel a brief surge of clarity and calm.</white>");
          p.mutateAttribute && p.mutateAttribute('sanity', 1);
        });
      }
    },

    playerEnter: state => player => {
      player.say("<cyan>The thick incense smoke curls around you, warm and strangely comforting.</cyan>");
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();
      const senseVerbs = ['examine', 'look', 'touch', 'feel', 'smell', 'sniff', 'taste', 'listen', 'search', 'swing'];

      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        censer: "The golden censer is intricately worked with scenes of pilgrims and saints, its surface warm to the touch.",
        chain: "A heavy iron chain suspends the censer from the ceiling, links worn smooth by centuries of motion.",
        smoke: "Thick, sweet-smelling smoke pours from the censer, glowing faintly as it curls around you.",
        incense: "The incense smells of honey, myrrh, and something bright and clean that clears your thoughts.",
        floor: "The stone floor is cracked and uneven, hidden in places beneath the drifting smoke.",
        cracks: "Jagged cracks spiderweb across the floor, hinting at old structural damage beneath the sanctity."
      };

      // SMELL / TASTE / LISTEN
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The incense is rich and sweet, with a cleansing undertone that steadies your nerves.</white>");
        player.mutateAttribute && player.mutateAttribute('sanity', 1);
        return true;
      }

      if (commandName === 'taste') {
        player.say("<white>The air tastes of resin and ash, with a faint sweetness that lingers on your tongue.</white>");
        return true;
      }

      if (commandName === 'listen') {
        player.say("<white>You hear the faint creak of the chain and the soft hiss of burning incense.</white>");
        return true;
      }

      // SEARCH: find small stash in cracked floor
      if (commandName === 'search') {
        const perception = player.getSkill ? (player.getSkill('perception') || 0) : 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 17;

        player.say("<yellow>You peer through the incense haze, probing the cracked floor with your hands...</yellow>");

        if (roll >= dc && !room.getMeta('censer_loot_found')) {
          room.setMeta('censer_loot_found', true);
          player.say("<green>Your fingers brush a hidden recess between two cracked stones. You pull out a small, soot-stained pouch.</green>");

          if (state.ItemManager) {
            const coins = state.ItemManager.create(room.area, 'ossuary:gold_coins');
            coins && coins.moveTo(player);
          }
        } else {
          player.say("<white>The smoke stings your eyes, and you find nothing beyond broken stone.</white>");
        }
        return true;
      }

      // SWING: minor positive-energy pulse, but risk of attracting the hell hound
      if (commandName === 'swing' && target.includes('censer')) {
        room.broadcast("<cyan>You give the censer a firm push. It swings wide, spilling thick waves of incense through the chamber.</cyan>");

        room.players.forEach(p => {
          p.mutateAttribute && p.mutateAttribute('health', 2);
          p.mutateAttribute && p.mutateAttribute('sanity', 1);
        });

        // Chance to aggro hell hound if present
        const mobs = [...room.npcs];
        const hound = mobs.find(m => m.id && m.id.includes('hell_hound'));
        if (hound && Math.random() < 0.5) {
          room.broadcast("<red>The sudden movement of the censer makes the hell hound snarl and lunge!</red>");
          hound.initiateCombat && hound.initiateCombat(player);
        }

        return true;
      }

      if (!target) return false;

      const key = Object.keys(nouns).find(k => target.includes(k));
      if (!key) return false;

      switch (commandName) {
        case 'touch':
        case 'feel':
          if (key === 'censer') {
            player.say("<yellow>The censer is warm beneath your fingers, the metal thrumming faintly with lingering devotion.</yellow>");
          } else {
            player.say(`<yellow>Your fingers brush against the ${key}. ${nouns[key]}</yellow>`);
          }
          return true;
        default: // examine/look
          player.say(`<white>${nouns[key]}</white>`);
          return true;
      }
    }
  }
};
