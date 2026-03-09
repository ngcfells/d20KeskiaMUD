
'use strict';

module.exports = {
  id: 'advanced_unarmed_training',
  name: 'Advanced Unarmed Training',
  category: 'general',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Quintessential Monk (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/advanced_unarmed_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "advanced_unarmed_training",
  name: "Advanced Unarmed Training",
  description: "You have mastered advanced unarmed combat techniques, granting passive bonuses to unarmed accuracy and damage.",
  category: "combat",

  stanceEffects: {
    base: {
      unarmedAttackBonus: 1,
      unarmedDamageBonus: 1
    },
    aggressive: {
      unarmedDamageBonus: 2
    },
    defensive: {
      dodgeBonus: 1
    },
    perceptive: {}
  },

  hooks: {}
};
