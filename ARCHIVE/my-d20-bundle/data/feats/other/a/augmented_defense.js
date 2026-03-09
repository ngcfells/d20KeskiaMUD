
'use strict';

module.exports = {
  id: 'augmented_defense',
  name: 'Augmented Defense',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: d20 Modern Core Rulebook (Wizards of the Coast)
// Additional Sources: Starfinder Core Rulebook (Paizo), Pathfinder APG (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/augmented_defense.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "augmented_defense",
  name: "Augmented Defense",
  description: "Your training enhances your defensive posture, granting passive bonuses to armor and resistance.",
  category: "combat",

  stanceEffects: {
    base: {
      armorBonus: 1
    },
    aggressive: {},
    defensive: {
      armorBonus: 2
    },
    perceptive: {}
  },

  hooks: {}
};
