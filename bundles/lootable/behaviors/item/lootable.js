'use strict';

const LootResolver = require('../../lib/loot/resolver');

module.exports = {
  listeners: {
    opened: state => function (player) {
      const config = this.getBehavior('lootable');
      if (!config) return;

      const resolver = new LootResolver(state);
      resolver.applyLoot(this, config);
      resolver.dropToRoom(this, this.room);
    },
  },
};
