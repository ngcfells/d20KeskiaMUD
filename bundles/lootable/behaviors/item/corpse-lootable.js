'use strict';

const LootResolver = require('../../lib/resolvers/lootResolver');

module.exports = {
  listeners: {
    loot: state => function (player) {
      const lootTable = this.getMeta('lootTable');
      if (!lootTable) {
        return player.say("There is nothing left to loot.");
      }

      const resolver = new LootResolver(state);
      resolver.applyLoot(this, lootTable);
      resolver.dropToRoom(this, this.room);

      // Remove corpse after looting
      this.room.removeItem(this);
    },

    harvest: state => function (player) {
      const lootTable = this.getMeta('lootTable');
      if (!lootTable) {
        return player.say("There is nothing left to harvest.");
      }

      const resolver = new LootResolver(state);
      resolver.applyHarvest(this, lootTable);
      resolver.dropToRoom(this, this.room);

      this.room.removeItem(this);
    },

    skin: state => function (player) {
      const lootTable = this.getMeta('lootTable');
      if (!lootTable) {
        return player.say("There is nothing left to skin.");
      }

      const resolver = new LootResolver(state);
      resolver.applySkin(this, lootTable);
      resolver.dropToRoom(this, this.room);

      this.room.removeItem(this);
    },

    butcher: state => function (player) {
      const lootTable = this.getMeta('lootTable');
      if (!lootTable) {
        return player.say("There is nothing left to butcher.");
      }

      const resolver = new LootResolver(state);
      resolver.applyButcher(this, lootTable);
      resolver.dropToRoom(this, this.room);

      this.room.removeItem(this);
    }
  }
};
