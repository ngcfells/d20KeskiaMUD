// bundles/my-d20-bundle/lib/classes/modern/modern_charismatic_hero.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_charismatic_hero',
    name: 'Charismatic Hero (d20 Modern)',
    origin: 'modern',
    description: 'A persuasive, magnetic hero who excels in leadership, negotiation, performance, and social influence.',

    hitDie: 6,

    classSkills: [
      'bluff',
      'diplomacy',
      'disguise',
      'gather_information',
      'intimidate',
      'knowledge_behavioral',
      'knowledge_pop_culture',
      'knowledge_business',
      'perform',
      'profession',
      'sense_motive'
    ],

    abilities: {
      1: ['charisma_talent_1', 'charismatic_path_feature_1'],
      2: ['bonus_feat_1'],
      3: ['charisma_talent_2'],
      4: ['bonus_feat_2'],
      5: ['charismatic_path_feature_2'],
      6: ['charisma_talent_3'],
      7: ['bonus_feat_3'],
      8: ['charisma_talent_4'],
      9: ['charismatic_path_feature_3'],
      10: ['bonus_feat_4'],
      11: ['charisma_talent_5'],
      12: ['bonus_feat_5'],
      13: ['charismatic_path_feature_4'],
      14: ['charisma_talent_6'],
      15: ['bonus_feat_6'],
      16: ['charisma_talent_7'],
      17: ['charismatic_path_feature_5'],
      18: ['bonus_feat_7'],
      19: ['charisma_talent_8'],
      20: ['perfect_charismatic_hero']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      leader: {
        id: 'leader',
        name: 'Leader Path',
        description: 'Heroes who inspire allies, coordinate groups, and command attention.'
      },
      negotiator: {
        id: 'negotiator',
        name: 'Negotiator Path',
        description: 'Experts in persuasion, diplomacy, and resolving conflicts through words.'
      },
      performer: {
        id: 'performer',
        name: 'Performer Path',
        description: 'Charismatic entertainers who captivate audiences and manipulate emotions.'
      },
      con_artist: {
        id: 'con_artist',
        name: 'Con Artist Path',
        description: 'Masters of deception, misdirection, and social manipulation.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You begin your journey as a Charismatic Hero.');
      player.setMeta('class', 'modern_charismatic_hero');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('charismatic_path')) {
        player.setMeta('charismatic_path', null);
      }

      // Charisma talents
      if (!player.getMeta('charisma_talent')) {
        player.setMeta('charisma_talent', {
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
