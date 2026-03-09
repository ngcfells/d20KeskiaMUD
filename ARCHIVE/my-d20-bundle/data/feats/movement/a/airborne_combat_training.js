
'use strict';

module.exports = {
  id: 'airborne_combat_training',
  name: 'Airborne Combat Training',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Starfinder Core Rulebook (Paizo)
// Additional Sources: Pathfinder APG (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/airborne_combat_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "airborne_combat_training",
  name: "Airborne Combat Training",
  description: "You are trained for combat in the air, granting passive bonuses to aerial maneuvering and defense.",
  category: "combat",

  stanceEffects: {
    base: {
      skillBonus: {
        fly: 2
      }
    },
    aggressive: {
      attackBonusAerial: 1
    },
    defensive: {
      dodgeBonusAerial: 1
    },
    perceptive: {}
  },

  hooks: {}
};
