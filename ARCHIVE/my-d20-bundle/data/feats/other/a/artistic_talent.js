
'use strict';

module.exports = {
  id: 'artistic_talent',
  name: 'Artistic Talent',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Core Rulebook (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Dragon Magazine (Paizo/WotC), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/artistic_talent.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "artistic_talent",
  name: "Artistic Talent",
  description: "You possess natural artistic ability, granting passive bonuses to creative and performance skills.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        perform: 2,
        craft: 1
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        perform: 3
      }
    }
  },

  hooks: {}
};
