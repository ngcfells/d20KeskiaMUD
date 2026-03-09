// bundles/my-d20-bundle/data/classes/psionic/psychic_warrior.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const pwPowerList = require('../../powerlists/psychic_warrior');

  return {
    id: 'psychic_warrior',
    name: 'Psychic Warrior',
    description: 'A disciplined combatant who augments martial prowess with psionic power.',
    hitDie: 8,

    classSkills: [
      'autohypnosis',
      'climb',
      'concentration',
      'craft',
      'jump',
      'knowledge_psionics',
      'profession',
      'psicraft',
      'ride',
      'swim'
    ],

    abilities: {
      1: ['psionic_focus', 'bonus_feat_psionic'],
      2: ['combat_mode_psionic'],
      5: ['bonus_feat_psionic'],
      8: ['combat_mode_psionic_2'],
      11: ['bonus_feat_psionic'],
      14: ['combat_mode_psionic_3'],
      17: ['bonus_feat_psionic'],
      20: ['psionic_apotheosis']
    },

    psionics: {
      mode: 'prepared',
      ability: 'wisdom',
      powerPoints: {
        1:  2,
        2:  4,
        3:  7,
        4:  11,
        5:  16,
        6:  22,
        7:  29,
        8:  37,
        9:  46,
        10: 56,
        11: 67,
        12: 79,
        13: 92,
        14: 106,
        15: 121,
        16: 137,
        17: 154,
        18: 172,
        19: 191,
        20: 211
      },
      maxPowerLevel: {
        1: 1,
        2: 1,
        3: 1,
        4: 2,
        5: 2,
        6: 2,
        7: 3,
        8: 3,
        9: 3,
        10: 4,
        11: 4,
        12: 4,
        13: 5,
        14: 5,
        15: 5,
        16: 6,
        17: 6,
        18: 6,
        19: 6,
        20: 6
      },
      powerList: pwPowerList
    },

    setup: player => {
      Broadcast.sayAt(player, 'You walk the path of the Psychic Warrior.');
      player.setMeta('class', 'psychic_warrior');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      if (!player.getMeta('preparedPowers')) {
        player.setMeta('preparedPowers', {});
      }
    }
  };
};
