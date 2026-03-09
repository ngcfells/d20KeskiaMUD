
'use strict';

module.exports = {
  id: 'all_weather_adaptation',
  name: 'All Weather Adaptation',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Frostburn / Sandstorm / Stormwrack (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/all_weather_adaptation.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "all_weather_adaptation",
  name: "All‑Weather Adaptation",
  description: "You are adapted to extreme climates, granting passive bonuses to resist environmental hazards.",
  category: "general",

  stanceEffects: {
    base: {
      saveBonus: {
        fortitude: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        fortitude: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};
