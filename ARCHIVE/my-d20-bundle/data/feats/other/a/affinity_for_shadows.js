
'use strict';

module.exports = {
  id: 'affinity_for_shadows',
  name: 'Affinity For Shadows',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Tome of Magic (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/affinity_for_shadows.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "affinity_for_shadows",
  name: "Affinity for Shadows",
  description: "You are attuned to shadowy energies, granting passive bonuses to stealth and resisting shadow effects.",
  category: "magic",

  stanceEffects: {
    base: {
      skillBonus: {
        hide: 2
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        will: 1
      }
    },
    perceptive: {}
  },

  hooks: {}
};
