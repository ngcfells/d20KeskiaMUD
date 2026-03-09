
'use strict';

module.exports = {
  id: 'arrow_deflection',
  name: 'Arrow Deflection',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo), Starfinder Core Rulebook (Paizo), Quintessential Monk (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arrow_deflection.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arrow_deflection",
  name: "Arrow Deflection",
  description: "You are skilled at deflecting incoming projectiles, granting passive bonuses to avoid ranged attacks.",
  category: "combat",

  stanceEffects: {
    base: {
      acVsRanged: 2
    },
    aggressive: {},
    defensive: {
      acVsRanged: 3
    },
    perceptive: {}
  },

  hooks: {}
};
