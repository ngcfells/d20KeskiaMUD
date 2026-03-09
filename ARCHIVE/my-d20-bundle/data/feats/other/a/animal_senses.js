
'use strict';

module.exports = {
  id: 'animal_senses',
  name: 'Animal Senses',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/animal_senses.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "animal_senses",
  name: "Animal Senses",
  description: "You possess heightened animal‑like senses, granting passive bonuses to perception and scent‑based detection.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        spot: 2,
        listen: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        spot: 3,
        listen: 3
      }
    }
  },

  hooks: {}
};
