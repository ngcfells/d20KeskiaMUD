
'use strict';

module.exports = {
  id: 'arcane_resilience',
  name: 'Arcane Resilience',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Arcana Evolved (Malhavoc Press), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_resilience.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_resilience",
  name: "Arcane Resilience",
  description: "Your magical training reinforces your defenses, granting passive bonuses to resist harmful spells.",
  category: "magic",

  stanceEffects: {
    base: {
      saveBonus: {
        will: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        will: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};
