
'use strict';

module.exports = {
  id: 'jack_of_all_trades',
  name: 'Jack Of All Trades',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Complete Adventurer, Wizards of the Coast
// Additional Sources: Player's Handbook 5e (Wizards of the Coast), d20 Modern Core Rulebook (Wizards of the Coast)

/**
BUNDLE: my-d20-bundle
PATH: bundles/my-d20-bundle/data/feats/j/jack_of_all_trades.js
PURPOSE: Passive stance‑based feat definition.
*/

module.exports = {
    id: "jack_of_all_trades",
    name: "Jack-of-All-Trades",
    description: "Use any skill as if trained and add half proficiency to checks.",
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
        allowUntrainedSkills: true,
        skillBonusGlobal: 1
      },
      aggressive: {
        physicalSkillBonus: 2 // Focus on Athletics/Acrobatics
      },
      defensive: {
        savingThrowBonusGlobal: 1 // General survival instinct
      },
      perceptive: {
        mentalSkillBonus: 2 // Focus on Knowledge/Investigation
      }
    },
  
    hooks: {
      onSkillCheck(player, skillId, result, state) {
        if (!player.hasProficiency(skillId)) {
          state.addBonus(Math.floor(player.proficiencyBonus / 2));
        }
      }
    }

};
