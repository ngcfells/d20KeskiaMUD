
'use strict';

module.exports = {
  id: 'awareness',
  name: 'Awareness',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Star Wars Saga Edition (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/awareness.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "awareness",
  name: "Awareness",
  description: "You maintain heightened situational awareness, granting passive bonuses to initiative and perception.",
  category: "general",

  stanceEffects: {
    base: {
      initiativeBonus: 1,
      skillBonus: {
        spot: 1,
        listen: 1
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      initiativeBonus: 2,
      skillBonus: {
        spot: 2,
        listen: 2
      }
    }
  },

  hooks: {}
};
