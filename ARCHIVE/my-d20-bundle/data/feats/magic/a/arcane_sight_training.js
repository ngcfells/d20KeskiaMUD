
'use strict';

module.exports = {
  id: 'arcane_sight_training',
  name: 'Arcane Sight Training',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Arcana Evolved (Malhavoc Press)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_sight_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_sight_training",
  name: "Arcane Sight Training",
  description: "You have trained your senses to perceive magical energies, granting passive bonuses to magical detection.",
  category: "magic",

  stanceEffects: {
    base: {
      detectMagicBonus: 1
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      detectMagicBonus: 2
    }
  },

  hooks: {}
};
