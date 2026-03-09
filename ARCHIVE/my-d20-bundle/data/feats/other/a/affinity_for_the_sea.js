
'use strict';

module.exports = {
  id: 'affinity_for_the_sea',
  name: 'Affinity For The Sea',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Stormwrack (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/affinity_for_the_sea.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "affinity_for_the_sea",
  name: "Affinity for the Sea",
  description: "You are attuned to aquatic environments, granting passive bonuses to swimming and underwater awareness.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        swim: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        swim: 3
      }
    }
  },

  hooks: {}
};
