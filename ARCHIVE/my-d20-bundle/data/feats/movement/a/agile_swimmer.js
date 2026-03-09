
'use strict';

module.exports = {
  id: 'agile_swimmer',
  name: 'Agile Swimmer',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Stormwrack (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_swimmer.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "agile_swimmer",
  name: "Agile Swimmer",
  description: "You move with exceptional agility underwater, granting passive bonuses to swim checks and underwater maneuvering.",
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
