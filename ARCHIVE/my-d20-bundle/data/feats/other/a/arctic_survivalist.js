
'use strict';

module.exports = {
  id: 'arctic_survivalist',
  name: 'Arctic Survivalist',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Frostburn (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arctic_survivalist.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arctic_survivalist",
  name: "Arctic Survivalist",
  description: "You are skilled at surviving in frozen environments, granting passive bonuses to cold survival and tracking.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        survival: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        survival: 3
      }
    }
  },

  hooks: {}
};
