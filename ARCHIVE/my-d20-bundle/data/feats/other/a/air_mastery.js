
'use strict';

module.exports = {
  id: 'air_mastery',
  name: 'Air Mastery',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Stormwrack (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/air_mastery.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "air_mastery",
  name: "Air Mastery",
  description: "You command the element of air with precision, granting passive bonuses to movement and aerial control.",
  category: "magic",

  stanceEffects: {
    base: {
      skillBonus: {
        fly: 1
      }
    },
    aggressive: {},
    defensive: {
      windResistance: 2
    },
    perceptive: {
      skillBonus: {
        fly: 2
      }
    }
  },

  hooks: {}
};
