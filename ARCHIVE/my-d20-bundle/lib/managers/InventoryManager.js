// path: bundles/my-d20-bundle/lib/managers/InventoryManager.js

'use strict';

const DimensionalInventory = require('../d20/dimensional-inventory');

module.exports = {
  canAdd(player, item) {
    return !DimensionalInventory.isFull(player);
  },

  add(player, item) {
    player.addItem(item);
  },

  remove(player, item) {
    player.removeItem(item);
  },

  isInStasis(item, player) {
    return DimensionalInventory.isInStasis(item, player);
  },

  getCarriedWeight(player) {
    return DimensionalInventory.getCarriedWeight(player);
  }
};
