// path: bundles/my-d20-bundle/lib/events/NpcEvents.js

'use strict';

module.exports = {
  emitInteraction(npc, type, actor) {
    npc.emit('npcInteraction', { type, actor });
  }
};
