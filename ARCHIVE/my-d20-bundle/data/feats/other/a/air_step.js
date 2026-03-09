
'use strict';

module.exports = {
  id: 'air_step',
  name: 'Air Step',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/air_step.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "air_step",
  name: "Air Step",
  description: "You move lightly and effortlessly, granting passive bonuses to balance and movement over unstable surfaces.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        balance: 2
      }
    },
    aggressive: {},
    defensive: {
      resistTrip: 1
    },
    perceptive: {}
  },

  hooks: {}
};
