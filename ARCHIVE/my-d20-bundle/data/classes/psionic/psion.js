// bundles/my-d20-bundle/data/classes/psionic/psion.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const psionPowerList = require('../../powerlists/psion');

  return {
    id: 'psion',
    name: 'Psion',
    description: 'A disciplined master of mental power, specializing in one psionic discipline.',
    hitDie: 4,

    classSkills: [
      'autohypnosis',
      'concentration',
      'craft',
      'knowledge_psionics',
      'knowledge_dungeoneering',
      'knowledge_arcana',
      'knowledge_planes',
      'profession',
      'psicraft'
    ],

    abilities: {
      1: ['psion_discipline', 'psionic_focus'],
      2: ['discipline_talent_1'],
      5: ['discipline_talent_2'],
      8: ['discipline_talent_3'],
      11: ['discipline_talent_4'],
      14: ['discipline_talent_5'],
      17: ['discipline_talent_6'],
      20: ['metamind_apotheosis']
    },

    psionics: {
      mode: 'prepared', // Psions prepare powers like Wizards prepare spells
      ability: 'intelligence',
      powerPoints: {
        1:  2,
        2:  6,
        3:  11,
        4:  17,
        5:  25,
        6:  35,
        7:  46,
        8:  58,
        9:  72,
        10: 88,
        11: 106,
        12: 126,
        13: 147,
        14: 170,
        15: 195,
        16: 221,
        17: 250,
        18: 280,
        19: 311,
        20: 343
      },
      maxPowerLevel: {
        1: 1,
        2: 1,
        3: 2,
        4: 2,
        5: 3,
        6: 3,
        7: 4,
        8: 4,
        9: 5,
        10: 5,
        11: 6,
        12: 6,
        13: 7,
        14: 7,
        15: 8,
        16: 8,
        17: 9,
        18: 9,
        19: 9,
        20: 9
      },
      powerList: psionPowerList
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your mind awakens to the path of the Psion.');
      player.setMeta('class', 'psion');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      if (!player.getMeta('preparedPowers')) {
        player.setMeta('preparedPowers', {});
      }

      if (!player.getMeta('discipline')) {
        player.setMeta('discipline', null);
      }
    }
  };
};
