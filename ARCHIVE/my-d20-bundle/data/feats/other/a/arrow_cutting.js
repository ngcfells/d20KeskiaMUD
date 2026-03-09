
'use strict';

module.exports = {
  id: 'arrow_cutting',
  name: 'Arrow Cutting',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Complete Warrior (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Core Rulebook (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arrow_cutting.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arrow_cutting",
  name: "Arrow Cutting",
  description: "You can deflect or cut incoming projectiles, granting passive bonuses to defense against ranged attacks.",
  category: "combat",

  stanceEffects: {
    base: {
      acVsRanged: 1
    },
    aggressive: {},
    defensive: {
      acVsRanged: 2
    },
    perceptive: {}
  },

  hooks: {}
};
