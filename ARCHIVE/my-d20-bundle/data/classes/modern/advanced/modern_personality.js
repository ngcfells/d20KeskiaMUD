// bundles/my-d20-bundle/lib/classes/modern/advanced/modern_personality.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_personality',
    name: 'Personality (d20 Modern Advanced)',
    origin: 'modern',
    description: 'A charismatic public figure skilled in persuasion, performance, negotiation, and social influence.',

    hitDie: 8,
    maxLevel: 10,

    prerequisites: {
      skills: {
        diplomacy: 4,
        perform: 4
      }
    },

    classSkills: [
      'bluff',
      'diplomacy',
      'disguise',
      'gather_information',
      'intimidate',
      'knowledge_behavioral',
      'knowledge_pop_culture',
      'perform',
      'profession',
      'sense_motive'
    ],

    abilities: {
      1: ['personality_path_feature_1', 'influence_training_1'],
      2: ['bonus_feat_1'],
      3: ['social_technique_1'],
      4: ['influence_training_2'],
      5: ['personality_path_feature_2'],
      6: ['bonus_feat_2'],
      7: ['social_technique_2'],
      8: ['influence_training_3'],
      9: ['personality_path_feature_3'],
      10: ['perfect_personality']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      celebrity: {
        id: 'celebrity',
        name: 'Celebrity Path',
        description: 'Public figures who command attention, shape trends, and sway crowds.'
      },
      negotiator: {
        id: 'negotiator',
        name: 'Negotiator Path',
        description: 'Experts in diplomacy, conflict resolution, and persuasive dialogue.'
      },
      performer: {
        id: 'performer',
        name: 'Performer Path',
        description: 'Entertainers who captivate audiences and manipulate emotional responses.'
      },
      influencer: {
        id: 'influencer',
        name: 'Influencer Path',
        description: 'Social operators who leverage networks, reputation, and subtle persuasion.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You step into the spotlight as a Personality.');
      player.setMeta('class', 'modern_personality');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 3000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('personality_path')) {
        player.setMeta('personality_path', null);
      }

      // Influence training
      if (!player.getMeta('influence_training')) {
        player.setMeta('influence_training', {
          bonus: 0
        });
      }

      // Social techniques
      if (!player.getMeta('social_technique')) {
        player.setMeta('social_technique', {
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
