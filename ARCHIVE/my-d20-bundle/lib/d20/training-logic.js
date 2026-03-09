/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/d20/training-logic.js
 */
'use strict';

module.exports = {
  /**
   * Passive practice hook. Called by skill engines or combat heartbeats.
   * @param {Player} player
   * @param {string} type - 'skills', 'attributes', or 'feats'
   * @param {string} key - e.g., 'tumble' or 'strength'
   * @param {number} dc - The Difficulty Class of the task performed
   */
  practice(player, type, key, dc = 10) {
    const progress = player.getMeta('training_progress') || this.initProgress(player);
    
    // Ensure the specific sub-key exists
    if (!progress[type][key]) {
      progress[type][key] = { exp: 0, goal: this.getInitialGoal(type) };
    }

    // d20 Logic: Harder tasks provide more "Experience" toward the breakthrough.
    // Trivial tasks (DC 5) give 1 exp. Hard tasks (DC 20) give 4 exp.
    const gain = Math.max(1, Math.floor(dc / 5));
    progress[type][key].exp += gain;

    // Check for Breakthrough
    if (progress[type][key].exp >= progress[type][key].goal) {
      this.triggerBreakthrough(player, type, key);
    }

    player.setMeta('training_progress', progress);
  },

  initProgress(player) {
    const fresh = { skills: {}, attributes: {}, feats: { exp: 0, goal: 5000 } };
    player.setMeta('training_progress', fresh);
    return fresh;
  },

  getInitialGoal(type) {
    const goals = { attributes: 5000, skills: 500, feats: 2500 };
    return goals[type] || 1000;
  }
};
