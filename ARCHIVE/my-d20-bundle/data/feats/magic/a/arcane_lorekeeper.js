
'use strict';

module.exports = {
  id: 'arcane_lorekeeper',
  name: 'Arcane Lorekeeper',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Arcana Evolved (Malhavoc Press), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_lorekeeper.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_lorekeeper",
  name: "Arcane Lorekeeper",
  description: "You preserve and study ancient magical lore, granting passive bonuses to arcane knowledge and research.",
  category: "magic",

  stanceEffects: {
    base: {
      skillBonus: {
        knowledge_arcana: 2,
        knowledge_history: 1
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        knowledge_arcana: 3,
        knowledge_history: 2
      }
    }
  },

  hooks: {}
};
