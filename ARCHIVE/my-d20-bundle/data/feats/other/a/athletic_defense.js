
'use strict';

module.exports = {
  id: 'athletic_defense',
  name: 'Athletic Defense',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Advanced Player’s Manual (Green Ronin)
// Additional Sources: Quintessential Rogue (Mongoose Publishing), Pathfinder APG (Paizo)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/athletic_defense.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "athletic_defense",
  name: "Athletic Defense",
  description: "Your athleticism enhances your defensive movements, granting passive bonuses to dodge and mobility.",
  category: "combat",

  stanceEffects: {
    base: {
      dodgeBonus: 1
    },
    aggressive: {},
    defensive: {
      dodgeBonus: 2
    },
    perceptive: {}
  },

  hooks: {}
};
