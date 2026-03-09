
'use strict';

module.exports = {
  id: 'arcane_insight_mastery',
  name: 'Arcane Insight Mastery',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Arcana Evolved (Malhavoc Press), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_insight_mastery.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_insight_mastery",
  name: "Arcane Insight Mastery",
  description: "Your deep understanding of arcane theory grants passive bonuses to identifying spells and magical effects.",
  category: "magic",

  stanceEffects: {
    base: {
      skillBonus: {
        spellcraft: 3,
        knowledge_arcana: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        spellcraft: 4,
        knowledge_arcana: 3
      }
    }
  },

  hooks: {}
};
