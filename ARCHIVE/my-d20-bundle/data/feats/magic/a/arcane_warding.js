
'use strict';

module.exports = {
  id: 'arcane_warding',
  name: 'Arcane Warding',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Arcana Evolved (Malhavoc Press), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_warding.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_warding",
  name: "Arcane Warding",
  description: "You weave protective arcane energies around yourself, granting passive bonuses to magical defense.",
  category: "magic",

  stanceEffects: {
    base: {
      spellResistanceBonus: 1
    },
    aggressive: {},
    defensive: {
      spellResistanceBonus: 2
    },
    perceptive: {}
  },

  hooks: {}
};
