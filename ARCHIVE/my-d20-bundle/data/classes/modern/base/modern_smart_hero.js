// bundles/my-d20-bundle/lib/classes/modern/modern_smart_hero.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_smart_hero',
    name: 'Smart Hero (d20 Modern)',
    origin: 'modern',
    description: 'A clever, analytical hero who excels in knowledge, planning, investigation, and technical expertise.',

    hitDie: 6,

    classSkills: [
      'appraise',
      'computers',
      'craft',
      'decipher_script',
      'demolitions',
      'disable_device',
      'forgery',
      'investigate',
      'knowledge_arcana',
      'knowledge_earth',
      'knowledge_life',
      'knowledge_physical',
      'knowledge_social',
      'knowledge_technology',
      'knowledge_tactics',
      'linguistics',
      'profession',
      'research',
      'search'
    ],

    abilities: {
      1: ['intelligence_talent_1', 'smart_path_feature_1'],
      2: ['bonus_feat_1'],
      3: ['intelligence_talent_2'],
      4: ['bonus_feat_2'],
      5: ['smart_path_feature_2'],
      6: ['intelligence_talent_3'],
      7: ['bonus_feat_3'],
      8: ['intelligence_talent_4'],
      9: ['smart_path_feature_3'],
      10: ['bonus_feat_4'],
      11: ['intelligence_talent_5'],
      12: ['bonus_feat_5'],
      13: ['smart_path_feature_4'],
      14: ['intelligence_talent_6'],
      15: ['bonus_feat_6'],
      16: ['intelligence_talent_7'],
      17: ['smart_path_feature_5'],
      18: ['bonus_feat_7'],
      19: ['intelligence_talent_8'],
      20: ['perfect_smart_hero']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      investigator: {
        id: 'investigator',
        name: 'Investigator Path',
        description: 'Experts in deduction, analysis, and uncovering hidden information.'
      },
      tactician: {
        id: 'tactician',
        name: 'Tactician Path',
        description: 'Strategists who excel at planning, coordination, and battlefield analysis.'
      },
      techie: {
        id: 'techie',
        name: 'Techie Path',
        description: 'Heroes who specialize in computers, electronics, and advanced technology.'
      },
      scholar: {
        id: 'scholar',
        name: 'Scholar Path',
        description: 'Masters of knowledge, research, and academic expertise.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You begin your journey as a Smart Hero.');
      player.setMeta('class', 'modern_smart_hero');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('smart_path')) {
        player.setMeta('smart_path', null);
      }

      // Intelligence talents
      if (!player.getMeta('intelligence_talent')) {
        player.setMeta('intelligence_talent', {
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
