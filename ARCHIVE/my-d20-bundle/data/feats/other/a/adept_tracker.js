
'use strict';

module.exports = {
  id: 'adept_tracker',
  name: 'Adept Tracker',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo), Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/adept_tracker.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "adept_tracker",
  name: "Adept Tracker",
  description: "You excel at following trails and signs, granting passive bonuses to tracking and survival.",
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
