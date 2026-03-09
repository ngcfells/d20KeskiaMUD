
'use strict';

module.exports = {
  id: 'assault_training',
  name: 'Assault Training',
  category: 'general',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: d20 Modern Core Rulebook (Wizards of the Coast)
// Additional Sources: Starfinder Core Rulebook (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/assault_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "assault_training",
  name: "Assault Training",
  description: "You are trained in aggressive assault tactics, granting passive bonuses to charge attacks and close‑quarters combat.",
  category: "combat",

  stanceEffects: {
    base: {
      chargeAttackBonus: 1
    },
    aggressive: {
      chargeAttackBonus: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
