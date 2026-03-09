
'use strict';

module.exports = {
  id: 'athletic_charge_mastery',
  name: 'Athletic Charge Mastery',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/athletic_charge_mastery.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "athletic_charge_mastery",
  name: "Athletic Charge Mastery",
  description: "Your athletic training enhances your charging technique, granting passive bonuses to accuracy and stability.",
  category: "combat",

  stanceEffects: {
    base: {
      chargeAttackBonus: 1
    },
    aggressive: {
      chargeAttackBonus: 2
    },
    defensive: {
      resistBullRush: 1
    },
    perceptive: {}
  },

  hooks: {}
};
