
'use strict';

module.exports = {
  id: 'alchemical_resistance',
  name: 'Alchemical Resistance',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/alchemical_resistance.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "alchemical_resistance",
  name: "Alchemical Resistance",
  description: "Your body is resistant to alchemical toxins and reagents, granting passive bonuses to Fortitude saves.",
  category: "general",

  stanceEffects: {
    base: {
      saveBonus: {
        fortitude: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        fortitude: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};
