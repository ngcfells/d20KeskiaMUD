
'use strict';

module.exports = {
  id: 'aerial_tactics',
  name: 'Aerial Tactics',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Races of the Wild (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/aerial_tactics.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "aerial_tactics",
  name: "Aerial Tactics",
  description: "You employ advanced tactics while airborne, granting passive bonuses to flanking and coordinated aerial attacks.",
  category: "combat",

  stanceEffects: {
    base: {
      flankingBonusAerial: 1
    },
    aggressive: {
      flankingBonusAerial: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
