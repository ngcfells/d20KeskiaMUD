// bundles/my-d20-bundle/data/classes/psionic/wilder.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const wilderPowerList = require('../../powerlists/wilder');

  return {
    id: 'wilder',
    name: 'Wilder',
    description: 'A raw, emotional manifester who channels psionic power through passion.',
    hitDie: 6,

    classSkills: [
      'autohypnosis',
      'bluff',
      'concentration',
      'craft',
      'knowledge_psionics',
      'profession',
      'psicraft'
    ],

    abilities: {
      1: ['wild_surge_1', 'volatile_mind_1'],
      5: ['wild_surge_2', 'volatile_mind_2'],
      8: ['surge_bond'],
      9: ['wild_surge_3', 'volatile_mind_3'],
      13: ['wild_surge_4', 'volatile_mind_4'],
      17: ['wild_surge_5', 'volatile_mind_5'],
      20: ['psionic_apotheosis']
    },

    psionics: {
      mode: 'spontaneous',
      ability: 'charisma',
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
      powerList: wilderPowerList
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your emotions ignite psionic power — you are a Wilder.');
      player.setMeta('class', 'wilder');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      if (!player.getMeta('knownPowers')) {
        player.setMeta('knownPowers', {});
      }
    }
  };
};
