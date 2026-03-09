'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  /**
   * Check if a player still meets their class restrictions.
   */
  checkPurity(player, state) {
    const playerClass = player.getClass(state);
    if (!playerClass || !playerClass.alignmentRequirement) return;

    const currentAlign = player.getMeta('alignment');
    if (!playerClass.alignmentRequirement.includes(currentAlign)) {
      this.fall(player, playerClass);
    }
  },

  /**
   * Strip abilities when a player falls.
   */
  fall(player, playerClass) {
    if (player.getMeta('isFallen')) return;

    player.setMeta('isFallen', true);
    B.sayAt(player, `<red><b>You have strayed from the path of the ${playerClass.name}! You have lost your class abilities!</b></red>`);
    
    // Logic to disable specific abilities (like Flurry or Smite)
    // In your useAbility code, check for player.getMeta('isFallen')
  },

  /**
   * Restore the player's status (used by the Atonement spell/NPC)
   */
  atone(player) {
    player.removeMeta('isFallen');
    B.sayAt(player, "<green>Your spirit is cleansed. Your class abilities have been restored.</green>");
  }
};
