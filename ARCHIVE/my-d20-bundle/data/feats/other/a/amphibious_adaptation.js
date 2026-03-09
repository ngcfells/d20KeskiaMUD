
'use strict';

module.exports = {
  id: 'amphibious_adaptation',
  name: 'Amphibious Adaptation',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Stormwrack (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Alien Archive (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/amphibious_adaptation.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "amphibious_adaptation",
  name: "Amphibious Adaptation",
  description: "You are adapted to aquatic environments, granting passive bonuses to swimming and underwater perception.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        swim: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        swim: 3
      }
    }
  },

  hooks: {}
};
