
'use strict';

module.exports = {
  id: 'airborne_hunter',
  name: 'Airborne Hunter',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Quintessential Ranger (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/airborne_hunter.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "airborne_hunter",
  name: "Airborne Hunter",
  description: "You track and strike prey from above, granting passive bonuses to perception and ranged attacks while airborne.",
  category: "combat",

  stanceEffects: {
    base: {
      skillBonus: {
        spot: 1
      }
    },
    aggressive: {
      attackBonusAerial: 1
    },
    defensive: {},
    perceptive: {
      skillBonus: {
        spot: 2
      }
    }
  },

  hooks: {}
};
