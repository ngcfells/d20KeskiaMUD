// bundles/my-d20-bundle/lib/classes/modern/modern_tough_hero.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_tough_hero',
    name: 'Tough Hero (d20 Modern)',
    origin: 'modern',
    description: 'A resilient hero who excels in endurance, durability, and surviving dangerous situations.',

    hitDie: 12,

    classSkills: [
      'athletics',
      'concentration',
      'drive',
      'intimidate',
      'knowledge_tactics',
      'perception',
      'profession',
      'survival',
      'swim',
      'treat_injury'
    ],

    abilities: {
      1: ['constitution_talent_1', 'tough_path_feature_1'],
      2: ['bonus_feat_1'],
      3: ['constitution_talent_2'],
      4: ['bonus_feat_2'],
      5: ['tough_path_feature_2'],
      6: ['constitution_talent_3'],
      7: ['bonus_feat_3'],
      8: ['constitution_talent_4'],
      9: ['tough_path_feature_3'],
      10: ['bonus_feat_4'],
      11: ['constitution_talent_5'],
      12: ['bonus_feat_5'],
      13: ['tough_path_feature_4'],
      14: ['constitution_talent_6'],
      15: ['bonus_feat_6'],
      16: ['constitution_talent_7'],
      17: ['tough_path_feature_5'],
      18: ['bonus_feat_7'],
      19: ['constitution_talent_8'],
      20: ['perfect_tough_hero']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      survivor: {
        id: 'survivor',
        name: 'Survivor Path',
        description: 'Experts in endurance, resisting harm, and surviving extreme conditions.'
      },
      ironhide: {
        id: 'ironhide',
        name: 'Ironhide Path',
        description: 'Heroes who develop natural damage reduction and physical resilience.'
      },
      medic: {
        id: 'medic',
        name: 'Medic Path',
        description: 'Tough heroes who specialize in stabilizing allies and resisting injury.'
      },
      stalwart: {
        id: 'stalwart',
        name: 'Stalwart Path',
        description: 'Defensive specialists who stand firm against overwhelming odds.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You begin your journey as a Tough Hero.');
      player.setMeta('class', 'modern_tough_hero');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('tough_path')) {
        player.setMeta('tough_path', null);
      }

      // Constitution talents
      if (!player.getMeta('constitution_talent')) {
        player.setMeta('constitution_talent', {
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
