
'use strict';

module.exports = {
  id: 'affinity_for_storms',
  name: 'Affinity For Storms',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Stormwrack (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/affinity_for_storms.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "affinity_for_storms",
  name: "Affinity for Storms",
  description: "You are attuned to storm energies, granting passive bonuses to electricity resistance and environmental awareness.",
  category: "magic",

  stanceEffects: {
    base: {
      electricityResistance: 2
    },
    aggressive: {},
    defensive: {
      electricityResistance: 3
    },
    perceptive: {}
  },

  hooks: {}
};
