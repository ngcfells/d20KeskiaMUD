// path: bundles/my-d20-bundle/lib/events/PlayerEvents.js

'use strict';

module.exports = {
  emitAction(player, action, payload = {}) {
    player.emit('playerAction', { action, ...payload });
  }
};
