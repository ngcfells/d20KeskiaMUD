
'use strict';

module.exports = {
  id: 'adaptive_defense',
  name: 'Adaptive Defense',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Starfinder Core Rulebook (Paizo)
// Additional Sources: Pathfinder APG (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/adaptive_defense.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "adaptive_defense",
  name: "Adaptive Defense",
  description: "You instinctively adjust your defenses, granting passive bonuses to resist attacks and effects.",
  category: "combat",

  stanceEffects: {
    base: {
      saveBonus: {
        reflex: 1,
        will: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        reflex: 2,
        will: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};
