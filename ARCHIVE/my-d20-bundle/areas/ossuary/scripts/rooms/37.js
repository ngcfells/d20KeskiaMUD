// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/37.js
'use strict';

module.exports = {
  listeners: {
    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      if (Math.random() < 0.05) {
        room.broadcast("<white>The silence deepens, swallowing even the sound of your own breathing.</white>");
      }

      if (Math.random() < 0.03) {
        room.broadcast("<magenta>For a heartbeat, you feel certain one of the stone knights has turned its head to watch you.</magenta>");
      }
    },

    playerEnter: state => player => {
      player.say("<white>A heavy, reverent silence settles over you as you enter the Hall of Statues.</white>");
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();
      const senseVerbs = ['examine', 'look', 'touch', 'feel', 'smell', 'sniff', 'taste', 'listen', 'search', 'push'];

      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        statues: "Life-sized limestone knights stand in a row, each one frozen mid-vigil with visor lowered.",
        knight: "The nearest knight’s armor is rendered in careful detail, every rivet and plate chiseled into stone.",
        knights: "Each knight is slightly different, as if modeled after real individuals rather than idealized forms.",
        visor: "The visors are all lowered, hiding whatever expressions the sculptor might have carved beneath.",
        pommel: "Stone hands rest on the pommels of stone swords, a gesture of eternal readiness.",
        incense: "A faint sandalwood scent lingers in the air, ghostly and comforting.",
        silence: "The silence here is so deep it seems to swallow sound before it can fully form."
      };

      // LISTEN / SMELL
      if (commandName === 'listen') {
        player.say("<white>You strain your ears and hear nothing—no drip of water, no shifting stone—only perfect, heavy quiet.</white>");
        return true;
      }

      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>A faint sandalwood scent clings to the air, like incense burned long ago.</white>");
        return true;
      }

      // SEARCH: find hint to south_secret
      if (commandName === 'search') {
        const perception = player.getSkill ? (player.getSkill('perception') || 0) : 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 16;

        player.say("<yellow>You carefully inspect the bases of the statues and the walls between them...</yellow>");

        if (roll >= dc && !room.getMeta('found_statue_switch')) {
          room.setMeta('found_statue_switch', true);
          player.say("<green>You notice faint scuff marks near one statue’s base, as if it has been turned recently.</green>");
        } else {
          player.say("<white>The statues remain inscrutable, their stone faces giving nothing away.</white>");
        }
        return true;
      }

      // PUSH: secret exit trigger
      if (commandName === 'push' && target.includes('statue')) {
        if (!room.getMeta('found_statue_switch')) {
          player.say("<white>You lean against one of the statues, but it does not budge.</white>");
          return true;
        }

        if (!room.getMeta('secret_opened')) {
          room.setMeta('secret_opened', true);
          room.broadcast("<cyan>With a grinding of stone, one of the knights pivots aside, revealing a narrow passage to the south.</cyan>");
        } else {
          player.say("<white>The statue has already been shifted, revealing the hidden passage.</white>");
        }
        return true;
      }

      if (!target) return false;

      const key = Object.keys(nouns).find(k => target.includes(k));
      if (!key) return false;

      switch (commandName) {
        case 'touch':
        case 'feel':
          player.say(`<yellow>Your fingers brush cold stone. ${nouns[key]}</yellow>`);
          return true;
        case 'taste':
          player.say("<white>You taste dust and old stone on your tongue. Nothing more.</white>");
          return true;
        default: // examine/look
          player.say(`<white>${nouns[key]}</white>`);
          return true;
      }
    }
  }
};
