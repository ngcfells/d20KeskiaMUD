
'use strict';

module.exports = {
  id: 'keen_mind',
  name: 'Keen Mind',
  category: 'psionic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player's Handbook, Wizards of the Coast
// Additional Sources: Xanathar's Guide to Everything (Wizards of the Coast)

/**
BUNDLE: my-d20-bundle
PATH: bundles/my-d20-bundle/data/feats/k/keen_mind.js
PURPOSE: Passive stance‑based feat definition.
*/

module.exports = {
    id: "keen_mind",
    name: "Keen Mind",
    description: "Perfect recall of time, direction, and recent events.",
    category: "general",
    prerequisites: {
        baseAttackBonus: 0,
        abilityScores: { intelligence: 13 },
        skills: {},
        feats: [],
        classFeatures: [],
        race: null,
        alignment: null
    },
    stanceEffects: {
      base: {
        intelligenceBonus: 1,
        alwaysKnowNorth: true
      },
      aggressive: {
        tacticalRecallBonus: 2 // Predict enemy movements based on memory
      },
      defensive: {
        saveVsIllusionBonus: 2 // Memory helps spot inconsistencies
      },
      perceptive: {
        passiveInvestigationBonus: 5,
        perfectRecallActive: true
      }
    }
};
