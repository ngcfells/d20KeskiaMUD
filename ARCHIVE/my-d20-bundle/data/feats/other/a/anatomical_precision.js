
'use strict';

module.exports = {
  id: 'anatomical_precision',
  name: 'Anatomical Precision',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Complete Scoundrel (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Core Rulebook (Paizo), Quintessential Rogue (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/anatomical_precision.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "anatomical_precision",
  name: "Anatomical Precision",
  description: "You understand vital points and weak spots, granting passive bonuses to precision damage.",
  category: "combat",

  stanceEffects: {
    base: {
      precisionDamageBonus: 1
    },
    aggressive: {
      precisionDamageBonus: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
