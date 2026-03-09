
'use strict';

module.exports = {
  id: 'airborne_stability_mastery',
  name: 'Airborne Stability Mastery',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Races of the Wild (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/airborne_stability_mastery.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "airborne_stability_mastery",
  name: "Airborne Stability Mastery",
  description: "You maintain exceptional balance and control while airborne, granting passive bonuses against forced movement.",
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
