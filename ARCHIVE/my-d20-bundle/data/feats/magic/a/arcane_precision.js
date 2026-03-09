
'use strict';

module.exports = {
  id: 'arcane_precision',
  name: 'Arcane Precision',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Arcana Evolved (Malhavoc Press)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_precision.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_precision",
  name: "Arcane Precision",
  description: "Your mastery of magical targeting grants passive bonuses to accuracy with spells requiring attack rolls.",
  category: "magic",

  stanceEffects: {
    base: {
      spellAttackBonus: 1
    },
    aggressive: {
      spellAttackBonus: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
