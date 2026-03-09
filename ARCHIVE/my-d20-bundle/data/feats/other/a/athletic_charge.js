
'use strict';

module.exports = {
  id: 'athletic_charge',
  name: 'Athletic Charge',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/athletic_charge.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "athletic_charge",
  name: "Athletic Charge",
  description: "Your athleticism enhances your charging attacks, granting passive bonuses to charge accuracy and stability.",
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
