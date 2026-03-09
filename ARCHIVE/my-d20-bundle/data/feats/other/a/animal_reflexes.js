
'use strict';

module.exports = {
  id: 'animal_reflexes',
  name: 'Animal Reflexes',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/animal_reflexes.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "animal_reflexes",
  name: "Animal Reflexes",
  description: "Your reflexes are sharp and instinctive, granting passive bonuses to Reflex saves.",
  category: "general",

  stanceEffects: {
    base: {
      saveBonus: {
        reflex: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        reflex: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};
