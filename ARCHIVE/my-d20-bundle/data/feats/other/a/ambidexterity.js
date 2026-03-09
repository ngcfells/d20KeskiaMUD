
'use strict';

module.exports = {
  id: 'ambidexterity',
  name: 'Ambidexterity',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo), Starfinder Core Rulebook (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/ambidexterity.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "ambidexterity",
  name: "Ambidexterity",
  description: "You can use either hand with equal skill, granting passive bonuses to off‑hand attacks and actions.",
  category: "combat",

  stanceEffects: {
    base: {
      offHandPenaltyReduction: 1
    },
    aggressive: {
      offHandAttackBonus: 1
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
