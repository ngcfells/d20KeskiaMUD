
'use strict';

module.exports = {
  id: 'arcane_toughness',
  name: 'Arcane Toughness',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Complete Mage (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Arcana Evolved (Malhavoc Press)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_toughness.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_toughness",
  name: "Arcane Toughness",
  description: "Your arcane training reinforces your vitality, granting passive bonuses to hit points.",
  category: "magic",

  stanceEffects: {
    base: {
      maxHpBonus: 3
    },
    aggressive: {},
    defensive: {
      maxHpBonus: 4
    },
    perceptive: {}
  },

  hooks: {}
};
