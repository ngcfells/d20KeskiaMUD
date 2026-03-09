
'use strict';

module.exports = {
  id: 'athletic_leap',
  name: 'Athletic Leap',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Complete Adventurer (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/athletic_leap.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "athletic_leap",
  name: "Athletic Leap",
  description: "You excel at jumping and leaping maneuvers, granting passive bonuses to jump distance and accuracy.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        jump: 2
      }
    },
    aggressive: {
      skillBonus: {
        jump: 3
      }
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
