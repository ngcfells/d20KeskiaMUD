
'use strict';

module.exports = {
  id: 'adaptive_combatant',
  name: 'Adaptive Combatant',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/adaptive_combatant.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "adaptive_combatant",
  name: "Adaptive Combatant",
  description: "You adjust your fighting style instinctively, gaining passive bonuses to attack and defense when switching tactics.",
  category: "combat",

  stanceEffects: {
    base: {
      attackBonus: 1,
      dodgeBonus: 1
    },
    aggressive: {
      attackBonus: 2
    },
    defensive: {
      dodgeBonus: 2
    },
    perceptive: {}
  },

  hooks: {}
};
