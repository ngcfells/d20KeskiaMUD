// bundles/my-d20-bundle/lib/classes/modern/advanced/modern_bodyguard.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_bodyguard',
    name: 'Bodyguard (d20 Modern Advanced)',
    origin: 'modern',
    description: 'A professional protector skilled in defense, threat assessment, and shielding allies from harm.',

    hitDie: 10,
    maxLevel: 10,

    prerequisites: {
      baseAttackBonus: 2,
      skills: {
        perception: 4,
        sense_motive: 2
      }
    },

    classSkills: [
      'athletics',
      'drive',
      'intimidate',
      'knowledge_tactics',
      'perception',
      'profession',
      'sense_motive',
      'survival',
      'treat_injury'
    ],

    abilities: {
      1: ['bodyguard_path_feature_1', 'protective_training_1'],
      2: ['bonus_feat_1'],
      3: ['intercept_technique_1'],
      4: ['protective_training_2'],
      5: ['bodyguard_path_feature_2'],
      6: ['bonus_feat_2'],
      7: ['intercept_technique_2'],
      8: ['protective_training_3'],
      9: ['bodyguard_path_feature_3'],
      10: ['perfect_bodyguard']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      guardian: {
        id: 'guardian',
        name: 'Guardian Path',
        description: 'Defensive specialists who excel at shielding allies and absorbing attacks.'
      },
      sentinel: {
        id: 'sentinel',
        name: 'Sentinel Path',
        description: 'Experts in vigilance, threat detection, and rapid protective response.'
      },
      bouncer: {
        id: 'bouncer',
        name: 'Bouncer Path',
        description: 'Close-quarters protectors skilled in crowd control and physical intervention.'
      },
      protector: {
        id: 'protector',
        name: 'Protector Path',
        description: 'Bodyguards who specialize in positioning, cover tactics, and defensive coordination.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You dedicate yourself to protection as a Bodyguard.');
      player.setMeta('class', 'modern_bodyguard');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 3000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('bodyguard_path')) {
        player.setMeta('bodyguard_path', null);
      }

      // Protective training
      if (!player.getMeta('protective_training')) {
        player.setMeta('protective_training', {
          bonus: 0
        });
      }

      // Intercept techniques
      if (!player.getMeta('intercept_technique')) {
        player.setMeta('intercept_technique', {
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
