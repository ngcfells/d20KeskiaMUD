
'use strict';

module.exports = {
  id: 'adaptive_reflexes',
  name: 'Adaptive Reflexes',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Starfinder Core Rulebook (Paizo)
// Additional Sources: Pathfinder APG (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/adaptive_reflexes.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "adaptive_reflexes",
  name: "Adaptive Reflexes",
  description: "Your reflexes adapt quickly to changing threats, granting passive bonuses to reaction speed.",
  category: "combat",

  stanceEffects: {
    base: {
      initiativeBonus: 1
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      initiativeBonus: 2
    }
  },

  hooks: {}
};
