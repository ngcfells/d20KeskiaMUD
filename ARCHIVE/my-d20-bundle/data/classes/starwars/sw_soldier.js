// bundles/my-d20-bundle/lib/classes/starwars/soldier.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'sw_soldier',
    name: 'Star Wars Soldier',
    genre: 'star_wars',
    description: 'A disciplined combatant trained in weapons, tactics, and battlefield leadership across countless worlds.',
    origin: 'starwars',

    hitDie: 10,

    classSkills: [
      'athletics',
      'climb',
      'craft',
      'demolitions',
      'drive',
      'intimidate',
      'knowledge_tactics',
      'perception',
      'profession',
      'ride',
      'survival'
    ],

    abilities: {
      1: ['weapon_training_1', 'armor_training_1', 'soldier_path_feature_1'],
      2: ['bravery_1'],
      3: ['combat_focus_1'],
      4: ['weapon_training_2'],
      5: ['soldier_path_feature_2'],
      6: ['armor_training_2'],
      7: ['combat_focus_2'],
      8: ['weapon_training_3'],
      9: ['soldier_path_feature_3'],
      10: ['bravery_2'],
      11: ['combat_focus_3'],
      12: ['armor_training_3'],
      13: ['weapon_training_4'],
      14: ['soldier_path_feature_4'],
      15: ['combat_focus_4'],
      16: ['bravery_3'],
      17: ['armor_training_4'],
      18: ['soldier_path_feature_5'],
      19: ['combat_focus_5'],
      20: ['perfect_soldier']
    },

    // Hybrid model: Star Wars classes use PATHS, not talent pools
    paths: {
      commando: {
        id: 'commando',
        name: 'Commando Path',
        description: 'Elite shock troopers specializing in heavy weapons, breaching, and direct assault.'
      },
      sharpshooter: {
        id: 'sharpshooter',
        name: 'Sharpshooter Path',
        description: 'Long‑range specialists trained in precision fire and battlefield control.'
      },
      vanguard: {
        id: 'vanguard',
        name: 'Vanguard Path',
        description: 'Frontline defenders who hold the line and protect allies under fire.'
      },
      tactician: {
        id: 'tactician',
        name: 'Tactician Path',
        description: 'Battlefield leaders who coordinate allies and exploit enemy weaknesses.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You take up arms as a Soldier of the galaxy.');
      player.setMeta('class', 'sw_soldier');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Soldier path selection
      if (!player.getMeta('soldier_path')) {
        player.setMeta('soldier_path', null);
      }

      // Weapon training
      if (!player.getMeta('weapon_training')) {
        player.setMeta('weapon_training', {
          bonus: 0
        });
      }

      // Armor training
      if (!player.getMeta('armor_training')) {
        player.setMeta('armor_training', {
          bonus: 0
        });
      }

      // Combat focus
      if (!player.getMeta('combat_focus')) {
        player.setMeta('combat_focus', {
          uses: 0,
          max: 0
        });
      }
    }
  };
};
