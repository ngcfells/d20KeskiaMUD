
'use strict';

module.exports = {
  id: 'arcane_sensitivity',
  name: 'Arcane Sensitivity',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Arcana Evolved (Malhavoc Press)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_sensitivity.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_sensitivity",
  name: "Arcane Sensitivity",
  description: "You are attuned to magical energies, granting passive bonuses to detecting and identifying magical auras.",
  category: "magic",

  stanceEffects: {
    base: {
      detectMagicBonus: 2
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      detectMagicBonus: 3
    }
  },

  hooks: {}
};
