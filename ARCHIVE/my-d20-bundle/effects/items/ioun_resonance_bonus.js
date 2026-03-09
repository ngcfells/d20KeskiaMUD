/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/effects/ioun_resonance_bonus.js
 */
'use strict';

module.exports = srcPath => {
  return {
    config: {
      name: 'Ioun Resonance',
      unique: false, // Allows multiple different harmonies to stack
      persists: false,
      type: 'buff'
    },
    state: {
      name: '',
      bonus: {}
    },
    modifiers: {
      attributes: function (attributes) {
        // Dynamically apply whatever bonuses the harmony defines
        for (const [stat, value] of Object.entries(this.state.bonus)) {
          if (attributes[stat] !== undefined) {
            attributes[stat] += value;
          }
        }
        return attributes;
      }
    },
    /**
   * Checks if a player can attempt to identify resonances.
   * Logic: One check allowed per skill rank.
   */
    canAttemptIdentify(player, skillId) {
      const currentRank = player.getSkill(skillId)?.rank || 0;
      const lastRankAttempted = player.getMeta(`discovery.last_rank_${skillId}`) || -1;
      return currentRank > lastRankAttempted;
    },
    recordAttempt(player, skillId) {
      const currentRank = player.getSkill(skillId)?.rank || 0;
      player.setMeta(`discovery.last_rank_${skillId}`, currentRank);
    }
  };
};
