'use strict';

const goals = require('./quest-goals');
const rewards = require('./quest-rewards');

module.exports = {
  listeners: {
    startup: state => {
      // Register custom goals
      for (const [name, goal] of Object.entries(goals)) {
        state.QuestGoalManager.set(name, goal);
      }

      // Register custom rewards
      for (const [name, reward] of Object.entries(rewards)) {
        state.QuestRewardManager.set(name, reward);
      }
    }
  }
};
