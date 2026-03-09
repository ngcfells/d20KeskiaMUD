
'use strict';

module.exports = {
  id: 'air_affinity',
  name: 'Air Affinity',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Stormwrack (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/air_affinity.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "air_affinity",
  name: "Air Affinity",
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
