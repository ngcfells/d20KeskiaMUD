
'use strict';

module.exports = {
  id: 'azure_sight',
  name: 'Azure Sight',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/azure_sight.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "azure_sight",
  name: "Azure Sight",
  description: "Your elemental affinity sharpens your senses, granting passive bonuses to perception in cold or dim environments.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        spot: 1
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        spot: 2
      }
    }
  },

  hooks: {}
};
