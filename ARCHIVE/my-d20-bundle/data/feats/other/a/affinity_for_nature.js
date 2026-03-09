
'use strict';

module.exports = {
  id: 'affinity_for_nature',
  name: 'Affinity For Nature',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/affinity_for_nature.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "affinity_for_nature",
  name: "Affinity for Nature",
  description: "You are deeply attuned to the natural world, granting passive bonuses to survival and animal interaction.",
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
