
'use strict';

module.exports = {
  id: 'artillery_training',
  name: 'Artillery Training',
  category: 'general',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: d20 Modern Core Rulebook (Wizards of the Coast)
// Additional Sources: d20 Future (Wizards of the Coast), Starfinder Core Rulebook (Paizo)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/artillery_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "artillery_training",
  name: "Artillery Training",
  description: "You are trained in the use of heavy and mounted weapons, granting passive bonuses to accuracy and stability.",
  category: "combat",

  stanceEffects: {
    base: {
      heavyWeaponAttackBonus: 1
    },
    aggressive: {
      heavyWeaponAttackBonus: 2
    },
    defensive: {
      recoilPenaltyReduction: 1
    },
    perceptive: {}
  },

  hooks: {}
};
