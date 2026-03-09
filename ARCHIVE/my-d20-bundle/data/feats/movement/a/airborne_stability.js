
'use strict';

module.exports = {
  id: 'airborne_stability',
  name: 'Airborne Stability',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Starfinder Core Rulebook (Paizo)
// Additional Sources: Pathfinder APG (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/airborne_stability.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "airborne_stability",
  name: "Airborne Stability",
  description: "You maintain exceptional balance while airborne, granting passive bonuses against forced movement.",
  category: "combat",

  stanceEffects: {
    base: {
      resistBullRush: 2,
      resistTrip: 2
    },
    aggressive: {},
    defensive: {
      resistBullRush: 3,
      resistTrip: 3
    },
    perceptive: {}
  },

  hooks: {}
};
