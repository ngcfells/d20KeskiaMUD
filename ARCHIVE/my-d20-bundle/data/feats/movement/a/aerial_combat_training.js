
'use strict';

module.exports = {
  id: 'aerial_combat_training',
  name: 'Aerial Combat Training',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Races of the Wild (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Core Rulebook (Paizo)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/aerial_combat_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "aerial_combat_training",
  name: "Aerial Combat Training",
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
