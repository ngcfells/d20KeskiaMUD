
'use strict';

module.exports = {
  id: 'affinity_for_spirits',
  name: 'Affinity For Spirits',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Occult Adventures (Paizo)
// Additional Sources: Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/affinity_for_spirits.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "affinity_for_spirits",
  name: "Affinity for Spirits",
  description: "You commune easily with spirits, granting passive bonuses to sensing supernatural presences and resisting possession.",
  category: "magic",

  stanceEffects: {
    base: {
      saveBonus: {
        will: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        will: 2
      }
    },
    perceptive: {
      detectMagicBonus: 1
    }
  },

  hooks: {}
};
