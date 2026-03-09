
'use strict';

module.exports = {
  id: 'animal_instincts',
  name: 'Animal Instincts',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/animal_instincts.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "animal_instincts",
  name: "Animal Instincts",
  description: "You possess heightened primal instincts, granting passive bonuses to initiative and perception.",
  category: "general",

  stanceEffects: {
    base: {
      initiativeBonus: 1
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      initiativeBonus: 2
    }
  },

  hooks: {}
};
