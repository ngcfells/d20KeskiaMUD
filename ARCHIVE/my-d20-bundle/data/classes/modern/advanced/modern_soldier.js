// bundles/my-d20-bundle/lib/classes/modern/advanced/modern_soldier.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_soldier',
    name: 'Soldier (d20 Modern Advanced)',
    origin: 'modern',
    description: 'A trained combat professional skilled in tactics, weapons, and battlefield discipline.',

    // Advanced classes use 10-level progression in d20 Modern
    hitDie: 10,
    maxLevel: 10,

    prerequisites: {
      baseAttackBonus: 2,
      skills: {
        athletics: 4,
        knowledge_tactics: 2
      }
    },

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
      1: ['soldier_path_feature_1', 'bonus_feat_1'],
      2: ['combat_training_1'],
      3: ['bonus_feat_2'],
      4: ['soldier_path_feature_2'],
      5: ['combat_training_2'],
      6: ['bonus_feat_3'],
      7: ['soldier_path_feature_3'],
      8: ['combat_training_3'],
      9: ['bonus_feat_4'],
      10: ['perfect_soldier']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      commando: {
        id: 'commando',
        name: 'Commando Path',
        description: 'Close-quarters specialists trained for high-risk, high-intensity combat.'
      },
      marksman: {
        id: 'marksman',
        name: 'Marksman Path',
        description: 'Experts in ranged precision, sniping, and firearm mastery.'
      },
      tactician: {
        id: 'tactician',
        name: 'Tactician Path',
        description: 'Battlefield leaders who excel in coordination, planning, and tactical advantage.'
      },
      heavy_weapons: {
        id: 'heavy_weapons',
        name: 'Heavy Weapons Path',
        description: 'Soldiers trained in explosives, suppression fire, and high-caliber weaponry.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You advance your training as a Soldier.');
      player.setMeta('class', 'modern_soldier');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 3000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('soldier_path')) {
        player.setMeta('soldier_path', null);
      }

      // Combat training
      if (!player.getMeta('combat_training')) {
        player.setMeta('combat_training', {
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
