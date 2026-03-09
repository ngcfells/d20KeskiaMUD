
'use strict';

module.exports = {
  id: 'adaptive_spellcasting',
  name: 'Adaptive Spellcasting',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Arcana Evolved (Malhavoc Press), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/adaptive_spellcasting.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "adaptive_spellcasting",
  name: "Adaptive Spellcasting",
  description: "You adjust your spellcasting technique on the fly, granting passive bonuses to concentration and spell reliability.",
  category: "magic",

  stanceEffects: {
    base: {
      skillBonus: {
        concentration: 2
      }
    },
    aggressive: {},
    defensive: {
      skillBonus: {
        concentration: 3
      }
    },
    perceptive: {}
  },

  hooks: {}
};
