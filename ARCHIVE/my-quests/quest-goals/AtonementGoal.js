'use strict';

const { QuestGoal } = require('ranvier');

/**
 * BUNDLE: my-quests
 * PATH: bundles/my-quests/quest-goals/AtonementGoal.js
 * PURPOSE: Track acts of penance or tithes required for Atonement.
 */
class AtonementGoal extends QuestGoal {
  constructor(quest, config, player) {
    super(quest, config, player);

    this.state = {
      progress: 0
    };

    // Listen for a custom event emitted by a Priest NPC or Altar
    this.onPenance = (amount) => {
      this.state.progress += amount;

      if (this.state.progress >= this.config.required) {
        this.state.progress = this.config.required;
        this.complete();
      }

      this.emit('progress', this.getProgress());
    };
  }

  setup() {
    this.player.on('penancePerformed', this.onPenance);
  }

  destroy() {
    this.player.removeListener('penancePerformed', this.onPenance);
  }

  getProgress() {
    const percent = Math.floor((this.state.progress / this.config.required) * 100);
    return {
      percent,
      display: `${this.config.title}: [${this.state.progress} / ${this.config.required}]`
    };
  }

  hydrate(state) {
    this.state = state;
  }

  serialize() {
    return this.state;
  }
}

module.exports = AtonementGoal;
