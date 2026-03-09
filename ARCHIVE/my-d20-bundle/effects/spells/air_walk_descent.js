// path: ./bundles/my-d20-bundle/effects/spells/air_walk_descent.js
'use strict';

module.exports = {
  config: {
    name: "Air Walk (Descent)",
    description: "Gentle floating descent. Immune to falling damage.",
    type: "buff",
    family: "adaptation",
    tier: 1
  },

  listeners: {
    effectActivated() {
      this.target.addTag('immune_falling_damage');
    },

    /**
     * Forced Movement: Every tick, move the player 'down' if possible.
     */
    updateTick() {
      const target = this.target;
      const room = target.room;
      const downExit = room.getExit('down');

      if (downExit) {
        target.say("<white>You drift slowly downward...</white>");
        target.moveTo(state.RoomManager.getRoom(downExit.roomId));
      }
    },

    effectDeactivated() {
      this.target.removeTag('immune_falling_damage');
      if (this.target.room.hasTag('aerial')) {
        this.target.say("<red>The last of the magic dissipates. Gravity takes hold!</red>");
      } else {
        this.target.say("<green>You touch down safely upon the ground.</green>");
      }
    }
  }
};
