
'use strict';

module.exports = {
  id: 'athletic_surge',
  name: 'Athletic Surge',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Advanced Player’s Manual (Green Ronin)
// Additional Sources: Quintessential Rogue (Mongoose Publishing), Pathfinder APG (Paizo)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/athletic_surge.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "athletic_surge",
  name: "Athletic Surge",
  description: "Your body responds instinctively under pressure, granting passive bonuses to athletic checks during combat.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        climb: 1,
        jump: 1,
        swim: 1
      }
    },
    aggressive: {
      skillBonus: {
        jump: 2
      }
    },
    defensive: {
      skillBonus: {
        climb: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};
