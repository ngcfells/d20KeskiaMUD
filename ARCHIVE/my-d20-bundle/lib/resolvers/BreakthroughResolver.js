/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/resolvers/BreakthroughResolver.js
 * PURPOSE: Handles breakthroughs triggered by TrainingLogic.
 *
 * TrainingLogic calls:
 *   triggerBreakthrough(player, type, key)
 *
 * This resolver performs the actual advancement:
 *   - Skill rank increases
 *   - Attribute score increases
 *   - Feat unlocks (global feat pool)
 *   - Recalculations (abilities, spells, skills)
 */

'use strict';

class BreakthroughResolver {
  /**
   * Trigger a breakthrough event.
   *
   * @param {GameState} state
   * @param {Player} player
   * @param {string} type - 'skills', 'attributes', or 'feats'
   * @param {string} key  - skillId, attributeId, or feat category
   */
  static trigger(state, player, type, key) {
    switch (type) {
      case 'skills':
        return this._skillBreakthrough(state, player, key);

      case 'attributes':
        return this._attributeBreakthrough(state, player, key);

      case 'feats':
        return this._featBreakthrough(state, player, key);

      default:
        return;
    }
  }

  // ------------------------------------------------------------
  // 1) SKILL BREAKTHROUGH
  // ------------------------------------------------------------
  static _skillBreakthrough(state, player, skillId) {
    const progress = player.getMeta('training_progress');
    if (!progress?.skills?.[skillId]) return;

    // Increase ranks by 1
    const currentRanks = player.skills?.[skillId] || 0;
    const newRanks = currentRanks + 1;

    // Update player skill ranks
    player.skills = player.skills || {};
    player.skills[skillId] = newRanks;

    // Reset training progress for this skill
    progress.skills[skillId].exp = 0;
    progress.skills[skillId].goal = this._nextSkillGoal(progress.skills[skillId].goal);

    player.setMeta('training_progress', progress);

    // Reapply skill-dependent systems
    this._reapplyAll(state, player);

    player.emit('breakthrough', 'skills', skillId, newRanks);
  }

  // ------------------------------------------------------------
  // 2) ATTRIBUTE BREAKTHROUGH
  // ------------------------------------------------------------
  static _attributeBreakthrough(state, player, attr) {
    const progress = player.getMeta('training_progress');
    if (!progress?.attributes?.[attr]) return;

    // Increase attribute by +1
    const base = player.getBaseAttribute(attr) || 10;
    player.setAttributeBase(attr, base + 1);

    // Reset training progress
    progress.attributes[attr].exp = 0;
    progress.attributes[attr].goal = this._nextAttributeGoal(progress.attributes[attr].goal);

    player.setMeta('training_progress', progress);

    // Reapply all systems affected by attributes
    this._reapplyAll(state, player);

    player.emit('breakthrough', 'attributes', attr, base + 1);
  }

  // ------------------------------------------------------------
  // 3) FEAT BREAKTHROUGH
  // ------------------------------------------------------------
  static _featBreakthrough(state, player, key) {
    const progress = player.getMeta('training_progress');
    if (!progress?.feats) return;

    // Increase feat exp pool
    // When pool reaches goal, grant a bonus feat
    progress.feats.exp = 0;
    progress.feats.goal = this._nextFeatGoal(progress.feats.goal);

    player.setMeta('training_progress', progress);

    // Add a "bonus feat token"
    const tokens = player.getMeta('bonusFeatTokens') || 0;
    player.setMeta('bonusFeatTokens', tokens + 1);

    player.emit('breakthrough', 'feats', key, tokens + 1);
  }

  // ------------------------------------------------------------
  // GOAL SCALING
  // ------------------------------------------------------------
  static _nextSkillGoal(prev) {
    return Math.floor(prev * 1.25); // 25% harder each time
  }

  static _nextAttributeGoal(prev) {
    return Math.floor(prev * 1.5); // attributes grow slower
  }

  static _nextFeatGoal(prev) {
    return Math.floor(prev * 1.75); // feats are rare
  }

  // ------------------------------------------------------------
  // REAPPLY ALL RESOLVERS
  // ------------------------------------------------------------
  static _reapplyAll(state, player) {
    const RaceResolver = require('./RaceResolver');
    const TraitResolver = require('./TraitResolver');
    const ClassResolver = require('./ClassResolver');
    const AbilityResolver = require('./AbilityResolver');
    const SpellResolver = require('./SpellResolver');

    // Clear derived metadata before reapplying
    player.setMeta('skillBonuses', {});
    player.setMeta('specialAbilities', []);
    player.setMeta('weaponProficiencies', []);
    player.setMeta('armorProficiencies', []);
    player.setMeta('abilities', []);
    player.setMeta('spells', []);

    // Reapply in correct order
    RaceResolver.apply(state, player);
    TraitResolver.apply(state, player);
    ClassResolver.apply(state, player);
    AbilityResolver.apply(state, player);
    SpellResolver.apply(state, player);
  }
}

module.exports = BreakthroughResolver;
