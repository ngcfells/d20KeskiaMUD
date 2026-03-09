
'use strict';

module.exports = {
  id: 'arcane_scholar',
  name: 'Arcane Scholar',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Arcana Evolved (Malhavoc Press), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_scholar.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_scholar",
  name: "Arcane Scholar",
  description: "You are a dedicated student of the arcane arts, granting passive bonuses to magical research and spell analysis.",
  category: "magic",

  stanceEffects: {
    base: {
      skillBonus: {
        spellcraft: 2,
        knowledge_arcana: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        spellcraft: 3,
        knowledge_arcana: 3
      }
    }
  },

  hooks: {}
};
