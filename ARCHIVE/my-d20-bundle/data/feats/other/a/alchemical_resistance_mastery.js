
'use strict';

module.exports = {
  id: 'alchemical_resistance_mastery',
  name: 'Alchemical Resistance Mastery',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/alchemical_resistance_mastery.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "alchemical_resistance_mastery",
  name: "Alchemical Resistance Mastery",
  description: "Your body is exceptionally resistant to alchemical hazards, granting passive bonuses to Fortitude saves.",
  category: "general",

  stanceEffects: {
    base: {
      saveBonus: {
        fortitude: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        fortitude: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};
