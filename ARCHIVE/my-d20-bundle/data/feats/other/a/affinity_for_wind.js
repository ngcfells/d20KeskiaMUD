
'use strict';

module.exports = {
  id: 'affinity_for_wind',
  name: 'Affinity For Wind',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Stormwrack (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/affinity_for_wind.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "affinity_for_wind",
  name: "Affinity for Wind",
  description: "You are attuned to the element of air, granting passive bonuses to movement and resisting wind effects.",
  category: "magic",

  stanceEffects: {
    base: {
      windResistance: 1
    },
    aggressive: {},
    defensive: {
      windResistance: 2
    },
    perceptive: {}
  },

  hooks: {}
};
