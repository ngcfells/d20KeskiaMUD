
'use strict';

module.exports = {
  id: 'artillery_specialist',
  name: 'Artillery Specialist',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Starfinder Core Rulebook (Paizo)
// Additional Sources: d20 Future (Wizards of the Coast), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/artillery_specialist.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "artillery_specialist",
  name: "Artillery Specialist",
  description: "You excel at operating heavy weapons, granting passive bonuses to damage and targeting precision.",
  category: "combat",

  stanceEffects: {
    base: {
      heavyWeaponDamageBonus: 1
    },
    aggressive: {
      heavyWeaponDamageBonus: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
