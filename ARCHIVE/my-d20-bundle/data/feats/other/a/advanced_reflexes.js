
'use strict';

module.exports = {
  id: 'advanced_reflexes',
  name: 'Advanced Reflexes',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Starfinder Core Rulebook (Paizo)
// Additional Sources: Pathfinder APG (Paizo), Quintessential Rogue (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/advanced_reflexes.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "advanced_reflexes",
  name: "Advanced Reflexes",
  description: "Your reflexes are exceptionally sharp, granting passive bonuses to Reflex saves and reaction speed.",
  category: "combat",

  stanceEffects: {
    base: {
      saveBonus: {
        reflex: 2
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        reflex: 3
      }
    },
    perceptive: {}
  },

  hooks: {}
};
