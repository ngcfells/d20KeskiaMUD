// bundles/my-d20-bundle/lib/classes/modern/modern_fast_hero.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_fast_hero',
    name: 'Fast Hero (d20 Modern)',
    origin: 'modern',
    description: 'An agile, quick-thinking hero who excels in speed, finesse, evasion, and precision-based skills.',

    hitDie: 8,

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'bluff',
      'drive',
      'escape_artist',
      'hide',
      'knowledge_tactics',
      'move_silently',
      'perception',
      'pilot',
      'profession',
      'sleight_of_hand',
      'tumble'
    ],

    abilities: {
      1: ['dexterity_talent_1', 'fast_path_feature_1'],
      2: ['bonus_feat_1'],
      3: ['dexterity_talent_2'],
      4: ['bonus_feat_2'],
      5: ['fast_path_feature_2'],
      6: ['dexterity_talent_3'],
      7: ['bonus_feat_3'],
      8: ['dexterity_talent_4'],
      9: ['fast_path_feature_3'],
      10: ['bonus_feat_4'],
      11: ['dexterity_talent_5'],
      12: ['bonus_feat_5'],
      13: ['fast_path_feature_4'],
      14: ['dexterity_talent_6'],
      15: ['bonus_feat_6'],
      16: ['dexterity_talent_7'],
      17: ['fast_path_feature_5'],
      18: ['bonus_feat_7'],
      19: ['dexterity_talent_8'],
      20: ['perfect_fast_hero']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      evasive: {
        id: 'evasive',
        name: 'Evasive Path',
        description: 'Masters of dodging, tumbling, and avoiding danger through sheer agility.'
      },
      speedster: {
        id: 'speedster',
        name: 'Speedster Path',
        description: 'Heroes who focus on movement speed, initiative, and rapid repositioning.'
      },
      finesse: {
        id: 'finesse',
        name: 'Finesse Path',
        description: 'Experts in precision attacks, subtle movement, and dexterous combat techniques.'
      },
      infiltrator: {
        id: 'infiltrator',
        name: 'Infiltrator Path',
        description: 'Stealthy operatives who excel at slipping past defenses and moving unseen.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You begin your journey as a Fast Hero.');
      player.setMeta('class', 'modern_fast_hero');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('fast_path')) {
        player.setMeta('fast_path', null);
      }

      // Dexterity talents
      if (!player.getMeta('dexterity_talent')) {
        player.setMeta('dexterity_talent', {
          known: [],
          active: null
        });
      }

      // Bonus feats
      if (!player.getMeta('bonus_feats')) {
        player.setMeta('bonus_feats', {
          count: 0
        });
      }
    }
  };
};
