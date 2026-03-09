
'use strict';

module.exports = {
  id: 'blind-flight',
  name: 'Blind-flight',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player's Handbook, Wizards of the Coast
// Additional Sources: Core Rulebook (Paizo), d20 Modern Core Rulebook (Wizards of the Coast)

/**
BUNDLE: my-d20-bundle
PATH: bundles/my-d20-bundle/data/feats/b/blind_fight.js
PURPOSE: Passive stance‑based feat definition.
*/

module.exports = {
    id: "blind_fight",
    name: "Blind-Fight",
    description: "Reroll miss chances against concealed targets and retain AC against invisible foes.",
    category: "combat",
    prerequisites: {
        baseAttackBonus: 0,
        abilityScores: {},
        skills: {},
        feats: [],
        classFeatures: [],
        race: null,
        alignment: null
    },
    stanceEffects: {
      base: {
        ignoreInvisibleMeleePenalty: true,
        concealmentReroll: true
      },
      aggressive: {
        concealmentRerollCount: 2 // Enhanced focus on hitting hidden targets
      },
      defensive: {
        acBonusVsInvisible: 2 // Extra protection when sight is unreliable
      },
      perceptive: {
        revealHiddenRadius: 5 // Instinctive awareness of nearby movement
      }
    },
    hooks: {
      onAttack(attacker, defender, state) {
        if (defender.isConcealed) {
          state.applyReroll("missChance");
        }
      }
    }
  };
