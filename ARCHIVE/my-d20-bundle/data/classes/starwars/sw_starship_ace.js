// bundles/my-d20-bundle/lib/classes/starwars/sw_starship_ace.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'sw_starship_ace',
    name: 'Starship Ace (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'An elite pilot who excels in starship combat, evasive maneuvers, and high-speed precision flying.',

    hitDie: 8,

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'computers',
      'drive',
      'knowledge_galactic',
      'knowledge_technology',
      'mechanics',
      'perception',
      'pilot',
      'profession',
      'repair',
      'tumble'
    ],

    abilities: {
      1: ['ace_maneuvers_1', 'ace_path_feature_1'],
      2: ['evasive_action_1'],
      3: ['starship_weapon_training_1'],
      4: ['ace_maneuvers_2'],
      5: ['ace_path_feature_2'],
      6: ['evasive_action_2'],
      7: ['starship_weapon_training_2'],
      8: ['ace_maneuvers_3'],
      9: ['ace_path_feature_3'],
      10: ['evasive_action_3'],
      11: ['starship_weapon_training_3'],
      12: ['ace_maneuvers_4'],
      13: ['ace_path_feature_4'],
      14: ['evasive_action_4'],
      15: ['starship_weapon_training_4'],
      16: ['ace_maneuvers_5'],
      17: ['ace_path_feature_5'],
      18: ['evasive_action_5'],
      19: ['starship_weapon_training_5'],
      20: ['perfect_starship_ace']
    },

    // Hybrid model: Star Wars uses PATHS
    paths: {
      dogfighter: {
        id: 'dogfighter',
        name: 'Dogfighter Path',
        description: 'Masters of close-quarters starship combat, tight turns, and aggressive maneuvers.'
      },
      interceptor: {
        id: 'interceptor',
        name: 'Interceptor Path',
        description: 'Pilots who specialize in speed, pursuit, and rapid-response tactics.'
      },
      bomber: {
        id: 'bomber',
        name: 'Bomber Path',
        description: 'Experts in heavy ordnance, precision strikes, and coordinated attack runs.'
      },
      stunt_pilot: {
        id: 'stunt_pilot',
        name: 'Stunt Pilot Path',
        description: 'Daredevils who push their ships to the limit with impossible maneuvers and aerial acrobatics.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You take the helm as a Starship Ace.');
      player.setMeta('class', 'sw_starship_ace');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('ace_path')) {
        player.setMeta('ace_path', null);
      }

      // Ace maneuvers
      if (!player.getMeta('ace_maneuvers')) {
        player.setMeta('ace_maneuvers', {
          bonus: 0
        });
      }

      // Evasive action
      if (!player.getMeta('evasive_action')) {
        player.setMeta('evasive_action', {
          bonus: 0
        });
      }

      // Starship weapon training
      if (!player.getMeta('starship_weapon_training')) {
        player.setMeta('starship_weapon_training', {
          bonus: 0
        });
      }
    }
  };
};
