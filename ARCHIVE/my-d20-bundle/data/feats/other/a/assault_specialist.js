
'use strict';

module.exports = {
  id: 'assault_specialist',
  name: 'Assault Specialist',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Starfinder Core Rulebook (Paizo)
// Additional Sources: d20 Modern (Wizards of the Coast), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/assault_specialist.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "assault_specialist",
  name: "Assault Specialist",
  description: "You excel at coordinated assault maneuvers, granting passive bonuses to damage and tactical positioning.",
  category: "combat",

  stanceEffects: {
    base: {
      damageBonus: 1
    },
    aggressive: {
      damageBonus: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
