
'use strict';

module.exports = {
  id: 'arcane_training',
  name: 'Arcane Training',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Complete Arcane (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Arcana Evolved (Malhavoc Press), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_training",
  name: "Arcane Training",
  description: "You have received formal instruction in arcane theory, granting passive bonuses to magical knowledge and spell preparation.",
  category: "magic",

  stanceEffects: {
    base: {
      skillBonus: {
        knowledge_arcana: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        knowledge_arcana: 3
      }
    }
  },

  hooks: {}
};
