// path: bundles/my-d20-bundle/lib/events/ItemEvents.js

'use strict';

module.exports = {
  emitInteraction(item, type, actor) {
    item.emit('itemInteraction', { type, actor });
  }
};
