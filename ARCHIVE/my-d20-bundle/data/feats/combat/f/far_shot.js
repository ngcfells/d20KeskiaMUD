
'use strict';

module.exports = {
  id: 'far_shot',
  name: 'Far Shot',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player's Handbook, Wizards of the Coast
// Additional Sources: Core Rulebook (Paizo), d20 Modern Core Rulebook (Wizards of the Coast)

/**
BUNDLE: my-d20-bundle
PATH: bundles/my-d20-bundle/data/feats/f/far_shot.js
PURPOSE: Passive stance‑based feat definition.
*/

module.exports = {
    id: "far_shot",
    name: "Far Shot",
    description: "Reduces penalties for ranged attacks at long distance.",
    category: "combat",
    prerequisites: {
        baseAttackBonus: 1,
        abilityScores: {},
        skills: {},
        feats: ["point_blank_shot"],
        classFeatures: [],
        race: null,
        alignment: null
    },
    stanceEffects: {
      base: {
        rangeIncrementMultiplier: 1.5,
        thrownRangeMultiplier: 2.0
      },
      aggressive: {
        longRangePenaltyReduction: 2 // Push further with accuracy
      },
      defensive: {
        rangeIncrementMultiplier: 1.0 // Focus on closer, safer targets
      },
      perceptive: {
        ignoreRangeDisadvantage: true // Precision aiming at distance
      }
    }
};
