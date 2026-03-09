'use strict';

const { QuestGoal } = require('ranvier');

/**
 * BUNDLE: my-quests
 * PATH: bundles/my-quests/quest-goals/PracticeGoal.js
 * PURPOSE: Requires the player to practice a specific d20 skill/attr X times.
 */
module.exports = class PracticeGoal extends QuestGoal {
  constructor(quest, config, player) {
    config = Object.assign({
      title: `Practice ${config?.key || 'skill'}`,
      type: 'skills',
      key: null,
      count: 1
    }, config);

    super(quest, config, player);

    this.state = {
      progress: 0
    };

    this._onPractice = (type, key) => {
      if (type === this.config.type && key === this.config.key) {
        this.state.progress++;

        if (this.state.progress >= this.config.count) {
          this.state.progress = this.config.count;
          this.complete();
        }

        this.emit('progress', this.getProgress());
      }
    };
  }

  setup() {
    this.player.on('practice', this._onPractice);
  }

  destroy() {
    this.player.removeListener('practice', this._onPractice);
  }

  getProgress() {
    const percent = Math.floor((this.state.progress / this.config.count) * 100);
    return {
      percent,
      display: `${this.config.title}: [${this.state.progress}/${this.config.count}]`
    };
  }

  hydrate(state) {
    this.state = state;
  }

  serialize() {
    return this.state;
  }
};
