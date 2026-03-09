
'use strict';

module.exports = {
  id: 'agile_assault',
  name: 'Agile Assault',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_assault.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "agile_assault",
  name: "Agile Assault",
  description: "You strike with precision while on the move, granting passive bonuses to attack rolls during movement.",
  category: "combat",

  stanceEffects: {
    base: {
      attackBonus: 1
    },
    aggressive: {
      attackBonus: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
