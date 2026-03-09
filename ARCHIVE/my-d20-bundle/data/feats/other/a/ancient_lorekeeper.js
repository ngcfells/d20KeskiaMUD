
'use strict';

module.exports = {
  id: 'ancient_lorekeeper',
  name: 'Ancient Lorekeeper',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Dragon Magazine (Paizo/WotC), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/ancient_lorekeeper.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "ancient_lorekeeper",
  name: "Ancient Lorekeeper",
  description: "You preserve ancient knowledge and traditions, granting passive bonuses to lore and historical research.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        knowledge_history: 2,
        knowledge_religion: 1
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        knowledge_history: 3,
        knowledge_religion: 2
      }
    }
  },

  hooks: {}
};
