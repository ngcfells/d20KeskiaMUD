
'use strict';

module.exports = {
  id: 'alchemical_affinity',
  name: 'Alchemical Affinity',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Core Rulebook (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Dragon Magazine (Paizo/WotC), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/alchemical_affinity.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "alchemical_affinity",
  name: "Alchemical Affinity",
  description: "You have a natural talent for alchemy, granting passive bonuses to crafting and identifying alchemical substances.",
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
