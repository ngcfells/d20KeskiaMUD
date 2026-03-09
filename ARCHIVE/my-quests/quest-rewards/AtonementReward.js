'use strict';

const { QuestReward } = require('ranvier');
const Atonement = require('../../my-d20-bundle/lib/classes/atonement');

/**
 * BUNDLE: my-quests
 * PATH: bundles/my-quests/quest-rewards/AtonementReward.js
 * PURPOSE: Restores class purity (clears isFallen) upon quest completion.
 */
class AtonementReward extends QuestReward {
  /**
   * @param {GameState} state
   * @param {Player} player
   * @param {Object} config (Optional configuration)
   */
  static redeem(state, player, config) {
    if (!player.getMeta('isFallen')) {
      return player.say("You were already pure of heart, but your devotion is noted.");
    }

    // Use the lib logic to clear isFallen and restore abilities
    Atonement.atone(player);

    // Optional: Reset alignment coordinates to a "Safe" threshold for the class
    const playerClass = player.getClass(state);
    if (playerClass && playerClass.id === 'paladin') {
      player.setMeta('alignment_morality', 100); // Max Good
      player.setMeta('alignment_order', 100);    // Max Lawful
    }
  }
}

module.exports = AtonementReward;
