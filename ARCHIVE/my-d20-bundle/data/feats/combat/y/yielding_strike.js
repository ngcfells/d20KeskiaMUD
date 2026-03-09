
'use strict';

module.exports = {
  id: 'yielding_strike',
  name: 'Yielding Strike',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Book of Exalted Deeds, Wizards of the Coast
// Additional Sources: Pathfinder Roleplaying Game (Paizo)

/**
BUNDLE: my-d20-bundle
PATH: bundles/my-d20-bundle/data/feats/y/yielding_strike.js
PURPOSE: Passive stance‑based feat definition.
*/

module.exports = {
    id: "yielding_strike",
    name: "Yielding Strike",
    description: "Mastery of non-lethal combat, subduing foes without killing.",
    category: "combat",
    prerequisites: {
        baseAttackBonus: 1,
        abilityScores: {},
        skills: {},
        feats: [],
        classFeatures: [],
        race: null,
        alignment: "good"
    },
    stanceEffects: {
      base: {
        noPenaltyNonLethal: true
      },
      aggressive: {
        nonLethalDamageBonus: 2
      },
      defensive: {
        parryNonLethalBonus: 2
      },
      perceptive: {
        insightToSubdue: 1 // Bonus to grapple or trip attempts
      }
    },
    hooks: {
      onDamage(attacker, defender, damage, state) {
        if (state.isNonLethal) {
          state.applyBonus(attacker.level);
        }
      }
    }
};
