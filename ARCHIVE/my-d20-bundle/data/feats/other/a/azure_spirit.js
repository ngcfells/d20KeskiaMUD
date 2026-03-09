
'use strict';

module.exports = {
  id: 'azure_spirit',
  name: 'Azure Spirit',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Occult Adventures (Paizo)
// Additional Sources: Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/azure_spirit.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "azure_spirit",
  name: "Azure Spirit",
  description: "Your spirit resonates with elemental cold, granting passive bonuses to willpower and magical detection.",
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
