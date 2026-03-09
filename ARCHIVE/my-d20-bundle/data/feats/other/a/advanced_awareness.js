
'use strict';

module.exports = {
  id: 'advanced_awareness',
  name: 'Advanced Awareness',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Star Wars Saga Edition (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/advanced_awareness.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "advanced_awareness",
  name: "Advanced Awareness",
  description: "Your heightened senses grant passive bonuses to perception and initiative.",
  category: "general",

  stanceEffects: {
    base: {
      initiativeBonus: 2,
      skillBonus: {
        spot: 2,
        listen: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      initiativeBonus: 3,
      skillBonus: {
        spot: 3,
        listen: 3
      }
    }
  },

  hooks: {}
};
