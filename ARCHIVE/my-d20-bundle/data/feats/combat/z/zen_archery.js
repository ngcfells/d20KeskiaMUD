
'use strict';

module.exports = {
  id: 'zen_archery',
  name: 'Zen Archery',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Complete Warrior, Wizards of the Coast
// Additional Sources: Core Rulebook (Paizo), d20 Modern (Wizards of the Coast)

/**
BUNDLE: my-d20-bundle
PATH: bundles/my-d20-bundle/data/feats/z/zen_archery.js
PURPOSE: Passive stance‑based feat definition.
*/

module.exports = {
    id: "zen_archery",
    name: "Zen Archery",
    description: "Use Wisdom instead of Dexterity for ranged attack rolls.",
    category: "combat",
    prerequisites: {
        baseAttackBonus: 3,
        abilityScores: { wisdom: 13 },
        skills: {},
        feats: ["point_blank_shot"],
        classFeatures: [],
        race: null,
        alignment: null
    },
    stanceEffects: {
      base: {
        useWisdomForRanged: true
      },
      aggressive: {
        ignorePartialConcealment: true
      },
      defensive: {
        threatenCloseRange: true // Can use bow for attacks of opportunity
      },
      perceptive: {
        rangeIncrementBonus: 20 // Feet added to base increment
      }
    },
    hooks: {
      onAttack(attacker, defender, state) {
        if (state.weaponType === "ranged") {
          state.overrideModifier("dex", "wis");
        }
      }
    }
};
