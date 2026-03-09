
'use strict';

module.exports = {
  id: 'alchemical_savant',
  name: 'Alchemical Savant',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/alchemical_savant.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "alchemical_savant",
  name: "Alchemical Savant",
  description: "You are a master of alchemical techniques, granting passive bonuses to crafting and using alchemical items.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        craft_alchemy: 3
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        craft_alchemy: 4
      }
    }
  },

  hooks: {}
};
