
'use strict';

module.exports = {
  id: 'agile_hunter',
  name: 'Agile Hunter',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Quintessential Ranger (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_hunter.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "agile_hunter",
  name: "Agile Hunter",
  description: "You hunt with speed and precision, granting passive bonuses to ranged attacks against moving targets.",
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
