// bundles/my-d20-bundle/lib/classes/modern/modern_strong_hero.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_strong_hero',
    name: 'Strong Hero (d20 Modern)',
    origin: 'modern',
    description: 'A physically powerful hero who excels in melee combat, athletics, and feats of raw strength.',

    hitDie: 10,

    classSkills: [
      'athletics',
      'climb',
      'drive',
      'intimidate',
      'jump',
      'knowledge_tactics',
      'perception',
      'profession',
      'survival',
      'swim'
    ],

    abilities: {
      1: ['strength_talent_1', 'strong_path_feature_1'],
      2: ['bonus_feat_1'],
      3: ['strength_talent_2'],
      4: ['bonus_feat_2'],
      5: ['strong_path_feature_2'],
      6: ['strength_talent_3'],
      7: ['bonus_feat_3'],
      8: ['strength_talent_4'],
      9: ['strong_path_feature_3'],
      10: ['bonus_feat_4'],
      11: ['strength_talent_5'],
      12: ['bonus_feat_5'],
      13: ['strong_path_feature_4'],
      14: ['strength_talent_6'],
      15: ['bonus_feat_6'],
      16: ['strength_talent_7'],
      17: ['strong_path_feature_5'],
      18: ['bonus_feat_7'],
      19: ['strength_talent_8'],
      20: ['perfect_strong_hero']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      brute: {
        id: 'brute',
        name: 'Brute Path',
        description: 'Masters of raw physical power, grappling, and overpowering force.'
      },
      athlete: {
        id: 'athlete',
        name: 'Athlete Path',
        description: 'Heroes who excel in mobility, endurance, and physical performance.'
      },
      enforcer: {
        id: 'enforcer',
        name: 'Enforcer Path',
        description: 'Combatants who use intimidation and strength to dominate encounters.'
      },
      breaker: {
        id: 'breaker',
        name: 'Breaker Path',
        description: 'Specialists in smashing objects, breaching barriers, and destructive power.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You begin your journey as a Strong Hero.');
      player.setMeta('class', 'modern_strong_hero');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('strong_path')) {
        player.setMeta('strong_path', null);
      }

      // Strength talents
      if (!player.getMeta('strength_talent')) {
        player.setMeta('strength_talent', {
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
