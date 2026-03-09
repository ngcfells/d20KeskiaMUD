// bundles/my-d20-bundle/lib/classes/modern/advanced/modern_infiltrator.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_infiltrator',
    name: 'Infiltrator (d20 Modern Advanced)',
    origin: 'modern',
    description: 'A covert specialist skilled in stealth, disguise, infiltration, and bypassing security systems.',

    hitDie: 8,
    maxLevel: 10,

    prerequisites: {
      baseAttackBonus: 1,
      skills: {
        hide: 4,
        move_silently: 4,
        disable_device: 2
      }
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'bluff',
      'disable_device',
      'disguise',
      'escape_artist',
      'hide',
      'investigate',
      'move_silently',
      'perception',
      'profession',
      'search',
      'sense_motive',
      'sleight_of_hand',
      'tumble'
    ],

    abilities: {
      1: ['infiltrator_path_feature_1', 'covert_training_1'],
      2: ['bonus_feat_1'],
      3: ['infiltration_technique_1'],
      4: ['covert_training_2'],
      5: ['infiltrator_path_feature_2'],
      6: ['bonus_feat_2'],
      7: ['infiltration_technique_2'],
      8: ['covert_training_3'],
      9: ['infiltrator_path_feature_3'],
      10: ['perfect_infiltrator']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      shadow: {
        id: 'shadow',
        name: 'Shadow Path',
        description: 'Masters of stealth, silent movement, and remaining unseen.'
      },
      impersonator: {
        id: 'impersonator',
        name: 'Impersonator Path',
        description: 'Experts in disguise, social infiltration, and identity manipulation.'
      },
      saboteur: {
        id: 'saboteur',
        name: 'Saboteur Path',
        description: 'Operatives skilled in traps, explosives, and disabling enemy infrastructure.'
      },
      ghost: {
        id: 'ghost',
        name: 'Ghost Path',
        description: 'Elite infiltrators who bypass security systems and leave no trace.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You slip into the shadows as an Infiltrator.');
      player.setMeta('class', 'modern_infiltrator');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 3000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('infiltrator_path')) {
        player.setMeta('infiltrator_path', null);
      }

      // Covert training
      if (!player.getMeta('covert_training')) {
        player.setMeta('covert_training', {
          bonus: 0
        });
      }

      // Infiltration techniques
      if (!player.getMeta('infiltration_technique')) {
        player.setMeta('infiltration_technique', {
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
