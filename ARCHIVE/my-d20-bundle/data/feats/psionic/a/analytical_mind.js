
'use strict';

module.exports = {
  id: 'analytical_mind',
  name: 'Analytical Mind',
  category: 'psionic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/analytical_mind.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "analytical_mind",
  name: "Analytical Mind",
  description: "You excel at logical reasoning and deduction, granting passive bonuses to knowledge and analysis skills.",
  category: "general",

  stanceEffects: {
    base: {
      skillBonus: {
        knowledge_arcana: 1,
        knowledge_engineering: 1,
        knowledge_science: 1
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        knowledge_arcana: 2,
        knowledge_engineering: 2,
        knowledge_science: 2
      }
    }
  },

  hooks: {}
};
