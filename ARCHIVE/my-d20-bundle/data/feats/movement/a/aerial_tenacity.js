
'use strict';

module.exports = {
  id: 'aerial_tenacity',
  name: 'Aerial Tenacity',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Races of the Wild (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/aerial_tenacity.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "aerial_tenacity",
  name: "Aerial Tenacity",
  description: "You maintain endurance and stability while airborne, granting passive bonuses to resist forced movement.",
  category: "combat",

  stanceEffects: {
    base: {
      resistBullRush: 1,
      resistTrip: 1
    },
    aggressive: {},
    defensive: {
      resistBullRush: 2,
      resistTrip: 2
    },
    perceptive: {}
  },

  hooks: {}
};
