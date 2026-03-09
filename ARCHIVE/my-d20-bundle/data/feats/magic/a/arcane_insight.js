
'use strict';

module.exports = {
  id: 'arcane_insight',
  name: 'Arcane Insight',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Complete Arcane (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Arcana Evolved (Malhavoc Press)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_insight.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_insight",
  name: "Arcane Insight",
  description: "Your understanding of arcane principles grants passive bonuses to spell identification and magical analysis.",
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
