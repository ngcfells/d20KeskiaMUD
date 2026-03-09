// ../my-d20-bundle/data/rules/feat_prereqs.js
'use strict';

module.exports = {
  /**
   * Check whether a player meets the prerequisites for a feat.
   * @param {GameState} state
   * @param {Player} player
   * @param {Object} feat
   * @returns {boolean}
   */
  canLearnFeat(state, player, feat) {
    const pre = feat.prerequisites || {};

    // Base Attack Bonus
    if (pre.baseAttackBonus) {
      const bab = player.getMeta('baseAttackBonus') || 0;
      if (bab < pre.baseAttackBonus) return false;
    }

    // Ability scores
    if (pre.abilityScores) {
      for (const ability in pre.abilityScores) {
        const required = pre.abilityScores[ability];
        const current = player.getMeta(`ability_${ability}`) || 0;
        if (current < required) return false;
      }
    }

    // Skills
    if (pre.skills) {
      for (const skillId in pre.skills) {
        const requiredRanks = pre.skills[skillId];
        const ranks = player.getMeta(`skill_${skillId}_ranks`) || 0;
        if (ranks < requiredRanks) return false;
      }
    }

    // Other feats
    if (pre.feats && pre.feats.length) {
      for (const featId of pre.feats) {
        if (!player.hasFeat(featId)) return false;
      }
    }

    // Class features
    if (pre.classFeatures && pre.classFeatures.length) {
      const features = player.getMeta('classFeatures') || [];
      for (const feature of pre.classFeatures) {
        if (!features.includes(feature)) return false;
      }
    }

    // Race
    if (pre.race) {
      const race = player.getMeta('race');
      if (race !== pre.race) return false;
    }

    // Alignment
    if (pre.alignment) {
      const alignment = player.getMeta('alignment');
      if (alignment !== pre.alignment) return false;
    }

    return true;
  }
};
