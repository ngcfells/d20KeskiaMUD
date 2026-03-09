
'use strict';

module.exports = {
  id: 'adaptive_senses',
  name: 'Adaptive Senses',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Starfinder Core Rulebook (Paizo)
// Additional Sources: Pathfinder APG (Paizo), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/adaptive_senses.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "adaptive_senses",
  name: "Adaptive Senses",
  description: "Your senses adjust rapidly to environmental changes, granting passive bonuses to perception.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        spot: 2,
        listen: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        spot: 3,
        listen: 3
      }
    }
  },

  hooks: {}
};
