
'use strict';

module.exports = {
  id: 'animal_guardian',
  name: 'Animal Guardian',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/animal_guardian.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "animal_guardian",
  name: "Animal Guardian",
  description: "Your bond with your animal companion enhances its defensive instincts, granting passive bonuses to its AC and saves.",
  category: "general",

  stanceEffects: {
    base: {
      companionBonus: {
        ac: 1,
        saves: 1
      }
    },
    aggressive: {},
    defensive: {
      companionBonus: {
        ac: 2,
        saves: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};
