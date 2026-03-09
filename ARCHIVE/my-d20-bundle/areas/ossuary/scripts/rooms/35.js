// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/35.js
'use strict';

/**
 * Room 35: The Catacomb Exit Loop
 * Hazards:
 *  - None (safe zone)
 * Benefits:
 *  - Minor warmth healing
 */

module.exports = {
  listeners: {

    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      if (Math.random() < 0.05) {
        for (const p of room.players) {
          p.say("<cyan>The gentle warmth of the masonry soothes your weary bones.</cyan>");
          p.mutateAttribute('health', 1);
        }
      }
    }
  }
};
