
'use strict';

module.exports = {
  id: 'aerial_precision',
  name: 'Aerial Precision',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Races of the Wild (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/aerial_precision.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "aerial_precision",
  name: "Aerial Precision",
  description: "You strike with accuracy while airborne, granting passive bonuses to aerial attack rolls.",
  category: "combat",

  stanceEffects: {
    base: {
      attackBonusAerial: 1
    },
    aggressive: {
      attackBonusAerial: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
