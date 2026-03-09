// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/40.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      if (Math.random() < 0.05) {
        room.broadcast("<white>A faint draft stirs the dust, revealing old footprints beneath the racks.</white>");
      }

      if (Math.random() < 0.03) {
        room.broadcast("<cyan>The etched map glints faintly, as though urging you to study it.</cyan>");
      }
    },

    playerEnter: state => player => {
      player.say("<white>The stale air smells of rust and old leather.</white>");
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = [
        'examine','look','touch','feel','smell','sniff','taste','listen','search','read'
      ];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        racks: "Empty weapon racks lean against the walls, their pegs stained where blades once rested.",
        weapons: "Most weapons are little more than rusted shapes, their edges long since eaten away.",
        leather: "The leather armor has rotted into stiff, cracked sheets that crumble at a touch.",
        dust: "A thick layer of dust covers everything except the map on the northern wall.",
        map: "The etched map shows the catacombs in careful detail, with a ‘Secret Vault’ marked near a collapsed wall.",
        etching: "The etching is sharp and deliberate, as if carved by a steady, practiced hand.",
        vault: "The ‘Secret Vault’ marking suggests hidden relics or wealth beyond a fallen barrier."
      };

      // SMELL
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The air smells of rust, dust, and old leather.</white>");
        return true;
      }

      // LISTEN
      if (commandName === 'listen') {
        player.say("<white>You hear nothing but the faint settling of dust.</white>");
        return true;
      }

      // READ MAP
      if (commandName === 'read' && target.includes('map')) {
        player.say("<cyan>You study the etched map carefully...</cyan>");
        player.say("<white>The ‘Secret Vault’ lies beyond a collapsed section of the ossuary. Perhaps there is another way in.</white>");
        player.setMeta && player.setMeta('knows_secret_vault', true);
        return true;
      }

      // SEARCH — find a salvageable piton or small relic
      if (commandName === 'search') {
        const perception = player.getSkill?.('perception') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 14;

        player.say("<yellow>You sift through the decayed armor and rusted weapons...</yellow>");

        if (roll >= dc && !room.getMeta('armory_loot_found')) {
          room.setMeta('armory_loot_found', true);
          player.say("<green>You find a single intact piton beneath a collapsed rack.</green>");
          const piton = state.ItemManager.create(room.area, 'ossuary:piton');
          piton && piton.moveTo(player);
        } else {
          player.say("<white>You find nothing but rust flakes and brittle leather.</white>");
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
          player.say("<white>You taste dust and metal. Not pleasant.</white>");
          return true;
        default:
          player.say(`<white>${nouns[key]}</white>`);
          return true;
      }
    }
  }
};
