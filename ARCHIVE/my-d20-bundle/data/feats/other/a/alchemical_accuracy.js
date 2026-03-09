
'use strict';

module.exports = {
  id: 'alchemical_accuracy',
  name: 'Alchemical Accuracy',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/alchemical_accuracy.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "alchemical_accuracy",
  name: "Alchemical Accuracy",
  description: "You excel at throwing alchemical items with precision, granting passive bonuses to ranged touch attacks.",
  category: "combat",

  stanceEffects: {
    base: {
      attackBonusRangedTouch: 1
    },
    aggressive: {
      attackBonusRangedTouch: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
