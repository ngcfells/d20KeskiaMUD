// bundles/my-d20-bundle/lib/classes/modern/advanced/modern_gunslinger.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_gunslinger',
    name: 'Gunslinger (d20 Modern Advanced)',
    origin: 'modern',
    description: 'A master of firearms who excels in precision shooting, trick shots, and rapid-fire techniques.',

    hitDie: 10,
    maxLevel: 10,

    prerequisites: {
      baseAttackBonus: 2,
      skills: {
        perception: 4,
        knowledge_tactics: 2
      }
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'bluff',
      'drive',
      'intimidate',
      'knowledge_tactics',
      'perception',
      'profession',
      'sleight_of_hand'
    ],

    abilities: {
      1: ['gunslinger_path_feature_1', 'trick_shot_1'],
      2: ['bonus_feat_1'],
      3: ['firearm_mastery_1'],
      4: ['trick_shot_2'],
      5: ['gunslinger_path_feature_2'],
      6: ['bonus_feat_2'],
      7: ['firearm_mastery_2'],
      8: ['trick_shot_3'],
      9: ['gunslinger_path_feature_3'],
      10: ['perfect_gunslinger']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      sharpshooter: {
        id: 'sharpshooter',
        name: 'Sharpshooter Path',
        description: 'Experts in long-range precision, scoped weapons, and pinpoint accuracy.'
      },
      duelist: {
        id: 'duelist',
        name: 'Duelist Path',
        description: 'Quick-draw specialists who excel in one-on-one gunfights and rapid targeting.'
      },
      trick_shooter: {
        id: 'trick_shooter',
        name: 'Trick Shooter Path',
        description: 'Stylized gunfighters who perform ricochets, disarms, and cinematic stunts.'
      },
      suppressor: {
        id: 'suppressor',
        name: 'Suppressor Path',
        description: 'Tactical shooters who excel in covering fire, suppression, and battlefield control.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You hone your aim and reflexes as a Gunslinger.');
      player.setMeta('class', 'modern_gunslinger');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 3000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('gunslinger_path')) {
        player.setMeta('gunslinger_path', null);
      }

      // Trick shots
      if (!player.getMeta('trick_shot')) {
        player.setMeta('trick_shot', {
          known: [],
          active: null
        });
      }

      // Firearm mastery
      if (!player.getMeta('firearm_mastery')) {
        player.setMeta('firearm_mastery', {
          bonus: 0
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
