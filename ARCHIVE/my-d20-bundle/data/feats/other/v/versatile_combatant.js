
'use strict';

module.exports = {
  id: 'versatile_combatant',
  name: 'Versatile Combatant',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player's Handbook II, Wizards of the Coast
// Additional Sources: Advanced Player's Guide (Paizo)

/**
BUNDLE: my-d20-bundle
PATH: bundles/my-d20-bundle/data/feats/v/versatile_combatant.js
PURPOSE: Passive stance‑based feat definition.
*/

module.exports = {
    id: "versatile_combatant",
    name: "Versatile Combatant",
    description: "Seamlessly transition between melee and ranged attacks in the same turn.",
    category: "combat",
    prerequisites: {
        baseAttackBonus: 1,
        abilityScores: { dexterity: 13 },
        skills: {},
        feats: ["quick_draw"],
        classFeatures: [],
        race: null,
        alignment: null
    },
    stanceEffects: {
      base: {
        noPenaltyMultiweapon: true,
        quickDrawEnabled: true
      },
      aggressive: {
        attackBonus: 1,
        dualWieldPenaltyReduction: 2
      },
      defensive: {
        acBonusVsAoO: 2 // Defensive shifting between ranges
      },
      perceptive: {
        threatRangeIncrease: 1 // Identifying openings for either weapon type
      }
    },
    hooks: {
      onAttack(attacker, defender, state) {
        if (state.isSwitchingWeaponType) {
          state.cancelAttackPenalty();
        }
      }
    }
};
