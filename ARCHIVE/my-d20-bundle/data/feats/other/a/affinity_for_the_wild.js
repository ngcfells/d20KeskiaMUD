
'use strict';

module.exports = {
  id: 'affinity_for_the_wild',
  name: 'Affinity For The Wild',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/affinity_for_the_wild.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "affinity_for_the_wild",
  name: "Affinity for the Wild",
  description: "You are deeply connected to wilderness environments, granting passive bonuses to survival and tracking.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        survival: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        survival: 3
      }
    }
  },

  hooks: {}
};
