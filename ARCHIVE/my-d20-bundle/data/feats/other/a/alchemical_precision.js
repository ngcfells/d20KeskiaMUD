
'use strict';

module.exports = {
  id: 'alchemical_precision',
  name: 'Alchemical Precision',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/alchemical_precision.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "alchemical_precision",
  name: "Alchemical Precision",
  description: "You craft and apply alchemical substances with exceptional accuracy, granting passive bonuses to alchemical skill checks.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        craft_alchemy: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        craft_alchemy: 3
      }
    }
  },

  hooks: {}
};
