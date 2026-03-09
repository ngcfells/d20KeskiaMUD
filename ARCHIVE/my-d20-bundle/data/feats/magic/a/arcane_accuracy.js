
'use strict';

module.exports = {
  id: 'arcane_accuracy',
  name: 'Arcane Accuracy',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Complete Arcane (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Arcana Evolved (Malhavoc Press)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_accuracy.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_accuracy",
  name: "Arcane Accuracy",
  description: "Your arcane knowledge sharpens your aim, granting passive bonuses to attack rolls with magical or finesse weapons.",
  category: "magic",

  stanceEffects: {
    base: {
      attackBonus: 1
    },
    aggressive: {
      attackBonus: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
