// bundles/my-d20-bundle/lib/classes/modern/modern_dedicated_hero.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_dedicated_hero',
    name: 'Dedicated Hero (d20 Modern)',
    origin: 'modern',
    description: 'A perceptive, intuitive hero who excels in insight, support, determination, and unwavering focus.',

    hitDie: 8,

    classSkills: [
      'concentration',
      'diplomacy',
      'gather_information',
      'heal',
      'knowledge_behavioral',
      'knowledge_civics',
      'knowledge_religion',
      'listen',
      'perception',
      'profession',
      'sense_motive',
      'treat_injury'
    ],

    abilities: {
      1: ['wisdom_talent_1', 'dedicated_path_feature_1'],
      2: ['bonus_feat_1'],
      3: ['wisdom_talent_2'],
      4: ['bonus_feat_2'],
      5: ['dedicated_path_feature_2'],
      6: ['wisdom_talent_3'],
      7: ['bonus_feat_3'],
      8: ['wisdom_talent_4'],
      9: ['dedicated_path_feature_3'],
      10: ['bonus_feat_4'],
      11: ['wisdom_talent_5'],
      12: ['bonus_feat_5'],
      13: ['dedicated_path_feature_4'],
      14: ['wisdom_talent_6'],
      15: ['bonus_feat_6'],
      16: ['wisdom_talent_7'],
      17: ['dedicated_path_feature_5'],
      18: ['bonus_feat_7'],
      19: ['wisdom_talent_8'],
      20: ['perfect_dedicated_hero']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      empath: {
        id: 'empath',
        name: 'Empath Path',
        description: 'Heroes who excel in reading people, calming tensions, and emotional insight.'
      },
      healer: {
        id: 'healer',
        name: 'Healer Path',
        description: 'Support specialists who stabilize allies, treat injuries, and enhance recovery.'
      },
      investigator: {
        id: 'investigator',
        name: 'Investigator Path',
        description: 'Intuitive detectives who rely on instinct, observation, and subtle clues.'
      },
      believer: {
        id: 'believer',
        name: 'Believer Path',
        description: 'Heroes whose conviction and faith grant them resilience and clarity of purpose.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You begin your journey as a Dedicated Hero.');
      player.setMeta('class', 'modern_dedicated_hero');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('dedicated_path')) {
        player.setMeta('dedicated_path', null);
      }

      // Wisdom talents
      if (!player.getMeta('wisdom_talent')) {
        player.setMeta('wisdom_talent', {
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
