
'use strict';

module.exports = {
  id: 'alchemical_endurance',
  name: 'Alchemical Endurance',
  category: 'general',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/alchemical_endurance.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "alchemical_endurance",
  name: "Alchemical Endurance",
  description: "Your body resists alchemical toxins and reagents, granting passive bonuses to Fortitude saves.",
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
