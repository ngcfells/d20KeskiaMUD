'use strict';

const { QuestReward } = require('ranvier');
const TrainingLogic = require('../../my-d20-bundle/lib/d20/training-logic');

/**
 * BUNDLE: my-quests
 * PATH: bundles/my-quests/quest-rewards/TrainingReward.js
 * PURPOSE: Grants % progress toward a d20 breakthrough.
 */
module.exports = class TrainingReward extends QuestReward {
  /**
   * config: { type: 'attributes', key: 'strength', percent: 25 }
   */
  static reward(state, quest, config, player) {
    const progress = player.getMeta('training_progress');

    // Ensure the target exists in the metadata
    if (!progress[config.type][config.key]) {
      progress[config.type][config.key] = {
        exp: 0,
        goal: TrainingLogic.getInitialGoal(config.type)
      };
    }

    const target = progress[config.type][config.key];
    const amount = Math.floor(target.goal * (config.percent / 100));

    // Apply progress using the existing TrainingLogic system
    TrainingLogic.practice(player, config.type, config.key, amount * 5);

    player.say(
      `<b><cyan>Quest Reward: You gained ${config.percent}% toward ${config.key} breakthrough!</cyan></b>`
    );
  }
};
