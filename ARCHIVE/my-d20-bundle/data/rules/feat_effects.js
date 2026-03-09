// ../my-d20-bundle/data/rules/feat_effects.js
'use strict';

const { stances } = require('../../stances');

module.exports = {
  /**
   * Returns a dictionary of all passive bonuses from feats + stance.
   */
  getEffectiveBonuses(state, player) {
    const stanceId = player.getMeta('stance') || 'neutral';
    const stance = stances[stanceId] || stances.neutral;

    const bonuses = {};

    // Start with stance bonuses
    for (const key in stance) {
      bonuses[key] = (bonuses[key] || 0) + stance[key];
    }

    // Apply feat bonuses
    for (const featId of player.getFeats()) {
      const feat = state.FeatManager.get(featId);
      if (!feat || !feat.passive) continue;

      // Attribute modifiers
      if (feat.attributes) {
        for (const key in feat.attributes) {
          bonuses[key] = (bonuses[key] || 0) + feat.attributes[key];
        }
      }

      // Stance-specific overrides
      if (feat.stance && feat.stance[stanceId]) {
        for (const key in feat.stance[stanceId]) {
          bonuses[key] = (bonuses[key] || 0) + feat.stance[stanceId][key];
        }
      }
    }

    return bonuses;
  }
};
