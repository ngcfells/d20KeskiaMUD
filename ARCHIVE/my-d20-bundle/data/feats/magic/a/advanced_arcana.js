
'use strict';

module.exports = {
  id: 'advanced_arcana',
  name: 'Advanced Arcana',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Complete Arcane (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Arcana Evolved (Malhavoc Press), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/advanced_arcana.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "advanced_arcana",
  name: "Advanced Arcana",
  description: "Your mastery of arcane principles grants passive bonuses to spellcasting and magical analysis.",
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
