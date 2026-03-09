// bundles/my-d20-bundle/lib/classes/modern/advanced/modern_martial_artist.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_martial_artist',
    name: 'Martial Artist (d20 Modern Advanced)',
    origin: 'modern',
    description: 'A disciplined unarmed combatant who excels in strikes, grapples, stances, and close-quarters mastery.',

    hitDie: 10,
    maxLevel: 10,

    prerequisites: {
      baseAttackBonus: 2,
      skills: {
        athletics: 4,
        tumble: 2
      }
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'escape_artist',
      'intimidate',
      'jump',
      'perception',
      'profession',
      'sense_motive',
      'tumble'
    ],

    abilities: {
      1: ['martial_path_feature_1', 'unarmed_training_1'],
      2: ['bonus_feat_1'],
      3: ['martial_technique_1'],
      4: ['unarmed_training_2'],
      5: ['martial_path_feature_2'],
      6: ['bonus_feat_2'],
      7: ['martial_technique_2'],
      8: ['unarmed_training_3'],
      9: ['martial_path_feature_3'],
      10: ['perfect_martial_artist']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      striker: {
        id: 'striker',
        name: 'Striker Path',
        description: 'Focused on powerful punches, kicks, and precision striking.'
      },
      grappler: {
        id: 'grappler',
        name: 'Grappler Path',
        description: 'Masters of holds, throws, joint locks, and submission techniques.'
      },
      defensive: {
        id: 'defensive',
        name: 'Defensive Path',
        description: 'Experts in parrying, evasion, redirection, and stance-based defense.'
      },
      spiritual: {
        id: 'spiritual',
        name: 'Spiritual Path',
        description: 'Martial artists who blend discipline, meditation, and inner focus into combat.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You refine your body and spirit as a Martial Artist.');
      player.setMeta('class', 'modern_martial_artist');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 3000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('martial_path')) {
        player.setMeta('martial_path', null);
      }

      // Unarmed training
      if (!player.getMeta('unarmed_training')) {
        player.setMeta('unarmed_training', {
          bonus: 0
        });
      }

      // Martial techniques
      if (!player.getMeta('martial_technique')) {
        player.setMeta('martial_technique', {
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
