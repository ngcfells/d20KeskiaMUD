
'use strict';

module.exports = {
  id: 'all_around_vision',
  name: 'All Around Vision',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Monster Manual (Wizards of the Coast)
// Additional Sources: Pathfinder Bestiary (Paizo), Starfinder Alien Archive (Paizo), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/all_around_vision.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "all_around_vision",
  name: "All‑Around Vision",
  description: "You possess enhanced peripheral vision, granting passive bonuses to perception and defense against flanking.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        spot: 2
      },
      resistFlanking: true
    },
    aggressive: {},
    defensive: {
      dodgeBonus: 1
    },
    perceptive: {
      skillBonus: {
        spot: 3
      }
    }
  },

  hooks: {}
};
