
'use strict';

module.exports = {
  id: 'agile_sniper',
  name: 'Agile Sniper',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Quintessential Ranger (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_sniper.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "agile_sniper",
  name: "Agile Sniper",
  description: "You maintain accuracy even while repositioning, granting passive bonuses to ranged attacks made after movement.",
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
