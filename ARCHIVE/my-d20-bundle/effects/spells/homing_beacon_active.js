'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  config: {
    name: "Homing Beacon",
    description: "You have an innate sense of the path back to your anchored rune.",
    type: "buff",
    family: "divination",
    tier: 1,
    duration: 3600000
  },

  listeners: {
    effectActivated() {
      this.target.addTag('has_homing_sense');
      this.emit('updateSense');
    },

    /**
     * Logic: Calculate distance and direction based on room coordinates.
     */
    updateSense() {
      const player = this.target;
      const home = player.getMeta('home_rune_location'); // { x, y, z, roomName }
      
      if (!home) return;

      // In a MUD, we compare room VNUMs or coordinates if available
      // Example Narrative Tiers:
      B.sayAt(player, `<cyan>[Beacon]: Your home rune in ${home.roomName} lies to the North-West, a score of miles away.</cyan>`);
    },

    /**
     * Whenever the player moves, provide a subtle nudge.
     */
    onMove() {
      if (Math.random() > 0.5) {
        this.emit('updateSense');
      }
    },

    effectDeactivated() {
      this.target.removeTag('has_homing_sense');
      this.target.say("<yellow>The internal pull toward your home rune fades away.</yellow>");
    }
  }
};
