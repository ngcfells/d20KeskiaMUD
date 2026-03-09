
'use strict';

module.exports = {
  id: 'night_vision',
  name: 'Night Vision',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: d20 Modern Core Rulebook, Wizards of the Coast
// Additional Sources: Star Wars Roleplaying Game (Wizards of the Coast)

/**
BUNDLE: my-d20-bundle
PATH: bundles/my-d20-bundle/data/feats/n/night_vision.js
PURPOSE: Passive stance‑based feat definition.
*/

module.exports = {
    id: "night_vision",
    name: "Night Vision",
    description: "Grants or enhances the ability to see in the dark.",
    category: "general",
    prerequisites: {
        baseAttackBonus: 0,
        abilityScores: { constitution: 13 },
        skills: {},
        feats: [],
        classFeatures: [],
        race: null,
        alignment: null
    },
    stanceEffects: {
        base: {
            darkvisionRange: 60
        },
        aggressive: {
            ambushBonusInDarkness: 2
        },
        defensive: {
            noPenaltyToACInDarkness: true
        },
        perceptive: {
            darkvisionRange: 120,
            seeThroughMagicalDarkness: false
        }
    }
};
