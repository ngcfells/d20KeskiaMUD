
'use strict';

module.exports = {
  id: 'arctic_adaptation',
  name: 'Arctic Adaptation',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Frostburn (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Core Rulebook (Paizo)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arctic_adaptation.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arctic_adaptation",
  name: "Arctic Adaptation",
  description: "You are adapted to cold environments, granting passive bonuses to resist cold and navigate icy terrain.",
  category: "general",

  stanceEffects: {
    base: {
      coldResistance: 2
    },
    aggressive: {},
    defensive: {
      coldResistance: 3
    },
    perceptive: {}
  },

  hooks: {}
};
