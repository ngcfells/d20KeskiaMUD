
'use strict';

module.exports = {
  id: 'axe_whirl',
  name: 'Axe Whirl',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Complete Warrior (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/axe_whirl.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "axe_whirl",
  name: "Axe Whirl",
  description: "You excel at sweeping axe motions, granting passive bonuses to wide‑arc attacks and maneuvering.",
  category: "combat",

  stanceEffects: {
    base: {
      cleaveBonus: 1
    },
    aggressive: {
      cleaveBonus: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
