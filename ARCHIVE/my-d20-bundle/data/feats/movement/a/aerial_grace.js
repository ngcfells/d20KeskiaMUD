
'use strict';

module.exports = {
  id: 'aerial_grace',
  name: 'Aerial Grace',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Races of the Wild (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/aerial_grace.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "aerial_grace",
  name: "Aerial Grace",
  description: "You move with exceptional grace while airborne, granting passive bonuses to aerial maneuvering.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        fly: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        fly: 3
      }
    }
  },

  hooks: {}
};
