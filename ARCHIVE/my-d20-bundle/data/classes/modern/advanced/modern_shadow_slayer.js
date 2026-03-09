// bundles/my-d20-bundle/lib/classes/modern/advanced/modern_shadow_slayer.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_shadow_slayer',
    name: 'Shadow Slayer (d20 Modern Advanced)',
    origin: 'modern',
    description: 'A supernatural hunter trained to identify, track, and eliminate creatures of the Shadow.',

    hitDie: 10,
    maxLevel: 10,

    prerequisites: {
      baseAttackBonus: 2,
      skills: {
        knowledge_arcana: 2,
        perception: 4
      }
    },

    classSkills: [
      'athletics',
      'balance',
      'concentration',
      'diplomacy',
      'gather_information',
      'intimidate',
      'investigate',
      'knowledge_arcana',
      'knowledge_religion',
      'knowledge_shadow',
      'perception',
      'profession',
      'sense_motive',
      'survival',
      'treat_injury'
    ],

    abilities: {
      1: ['slayer_path_feature_1', 'shadow_training_1'],
      2: ['bonus_feat_1'],
      3: ['slayer_technique_1'],
      4: ['shadow_training_2'],
      5: ['slayer_path_feature_2'],
      6: ['bonus_feat_2'],
      7: ['slayer_technique_2'],
      8: ['shadow_training_3'],
      9: ['slayer_path_feature_3'],
      10: ['perfect_shadow_slayer']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      hunter: {
        id: 'hunter',
        name: 'Hunter Path',
        description: 'Experts in tracking, identifying, and eliminating supernatural threats.'
      },
      exorcist: {
        id: 'exorcist',
        name: 'Exorcist Path',
        description: 'Slayers who specialize in banishing, resisting, and purifying dark forces.'
      },
      occultist: {
        id: 'occultist',
        name: 'Occultist Path',
        description: 'Hunters who use arcane knowledge, rituals, and supernatural insight.'
      },
      stalker: {
        id: 'stalker',
        name: 'Stalker Path',
        description: 'Stealthy slayers who strike from the shadows and exploit monster weaknesses.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You take up the mantle of a Shadow Slayer.');
      player.setMeta('class', 'modern_shadow_slayer');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 3000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('slayer_path')) {
        player.setMeta('slayer_path', null);
      }

      // Shadow training
      if (!player.getMeta('shadow_training')) {
        player.setMeta('shadow_training', {
          bonus: 0
        });
      }

      // Slayer techniques
      if (!player.getMeta('slayer_technique')) {
        player.setMeta('slayer_technique', {
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
