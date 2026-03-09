
'use strict';

module.exports = {
  id: 'arrow_precision',
  name: 'Arrow Precision',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Quintessential Ranger (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arrow_precision.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arrow_precision",
  name: "Arrow Precision",
  description: "You excel at placing arrows with deadly accuracy, granting passive bonuses to ranged attack rolls.",
  category: "combat",

  stanceEffects: {
    base: {
      attackBonusRanged: 1
    },
    aggressive: {
      attackBonusRanged: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
