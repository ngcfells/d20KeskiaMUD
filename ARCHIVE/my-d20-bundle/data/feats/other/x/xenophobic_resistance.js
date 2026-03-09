
'use strict';

module.exports = {
  id: 'xenophobic_resistance',
  name: 'Xenophobic Resistance',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: d20 Future, Wizards of the Coast
// Additional Sources: Races of the Wild (Wizards of the Coast)

/**
BUNDLE: my-d20-bundle
PATH: bundles/my-d20-bundle/data/feats/x/xenophobic_resistance.js
PURPOSE: Passive stance‑based feat definition.
*/

module.exports = {
    id: "xenophobic_resistance",
    name: "Xenophobic Resistance",
    description: "Inherent mental resistance against foreign or alien influences.",
    category: "general",
    prerequisites: {
        baseAttackBonus: 0,
        abilityScores: { wisdom: 13 },
        skills: {},
        feats: [],
        classFeatures: [],
        race: null,
        alignment: null
    },
    stanceEffects: {
      base: {
        saveBonusVsMindAffecting: 2,
        saveBonusVsFear: 2
      },
      aggressive: {
        intimidateBonusVsNonNative: 4
      },
      defensive: {
        spellResistanceBase: 5
      },
      perceptive: {
        senseMotiveVsNonNative: 4
      }
    },
    hooks: {
      onDefense(attacker, defender, state) {
        if (attacker.isAlienOrExtraplanar) {
          state.addBonus("savingThrow", 2);
        }
      }
    }
};
