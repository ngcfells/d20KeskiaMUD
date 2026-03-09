// path: bundles/my-d20-bundle/lib/events/InventoryEvents.js

'use strict';

module.exports = {
  emitChange(player, type, item) {
    player.emit('inventoryChange', { type, item });
  }
};
