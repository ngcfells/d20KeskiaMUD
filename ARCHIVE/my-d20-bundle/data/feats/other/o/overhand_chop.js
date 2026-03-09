
'use strict';

module.exports = {
  id: 'overhand_chop',
  name: 'Overhand Chop',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Advanced Player's Guide, Paizo
// Additional Sources: Core Rulebook (Pathfinder)

/**
BUNDLE: my-d20-bundle
PATH: bundles/my-d20-bundle/data/feats/o/overhand_chop.js
PURPOSE: Passive stance‑based feat definition.
*/

module.exports = {
    id: "overhand_chop",
    name: "Overhand Chop",
    description: "Add double Strength bonus to single two-handed melee attacks.",
    category: "combat",
    prerequisites: {
        baseAttackBonus: 3,
        abilityScores: { strength: 15 },
        skills: {},
        feats: ["power_attack"],
        classFeatures: [],
        race: null,
        alignment: null
    },
    stanceEffects: {
      base: {
        twoHandedStrMultiplier: 2.0
      },
      aggressive: {
        damageBonusStatic: 5,
        acPenalty: -2
      },
      defensive: {
        twoHandedStrMultiplier: 1.5, // Revert to standard for safety
        parryBonus: 1
      },
      perceptive: {
        ignoreArmorBonus: 1 // Precision over power
      }
    },
    hooks: {
      onDamage(attacker, defender, damage, state) {
        if (attacker.isUsingTwoHandedWeapon() && state.isStandardAction) {
          state.applyMultiplier("strengthBonus", 2.0);
        }
      }
    }
};
