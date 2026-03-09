// path: bundles/my-d20-bundle/lib/resolvers/TargetResolver.js

'use strict';

const ArgParser = require('../ArgParser');

module.exports = {
  /**
   * Resolve a target from various pools using dot notation.
   */
  resolve(player, search, opts = {}) {
    const {
      includeInventory = false,
      includeEquipment = false,
      includeRoomItems = false,
      includeRoomPlayers = false,
      includeRoomNpcs = false,
    } = opts;

    const pools = [];

    if (includeInventory) {
      pools.push(player.inventory);
    }

    if (includeEquipment) {
      pools.push([...player.equipment.values()].flat());
    }

    if (includeRoomItems && player.room) {
      pools.push(player.room.items);
    }

    if (includeRoomPlayers && player.room) {
      pools.push(player.room.players);
    }

    if (includeRoomNpcs && player.room) {
      pools.push(player.room.npcs);
    }

    for (const pool of pools) {
      const found = ArgParser.parseDot(search, pool);
      if (found) {
        return found;
      }
    }

    return null;
  }
};
