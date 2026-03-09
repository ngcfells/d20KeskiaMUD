// bundles/my-d20-bundle/lib/classes/starwars/sw_bounty_hunter.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'sw_bounty_hunter',
    name: 'Bounty Hunter (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'A relentless tracker and combat specialist who excels at capturing targets using skill, gadgets, and precision.',

    hitDie: 10,

    classSkills: [
      'acrobatics',
      'athletics',
      'bluff',
      'climb',
      'computers',
      'craft',
      'disable_device',
      'drive',
      'intimidate',
      'knowledge_galactic',
      'listen',
      'mechanics',
      'move_silently',
      'perception',
      'pilot',
      'profession',
      'search',
      'sense_motive',
      'survival'
    ],

    abilities: {
      1: ['mark_target_1', 'hunter_path_feature_1'],
      2: ['tracking_mastery_1'],
      3: ['combat_trick_1'],
      4: ['mark_target_2'],
      5: ['hunter_path_feature_2'],
      6: ['tracking_mastery_2'],
      7: ['combat_trick_2'],
      8: ['mark_target_3'],
      9: ['hunter_path_feature_3'],
      10: ['tracking_mastery_3'],
      11: ['combat_trick_3'],
      12: ['mark_target_4'],
      13: ['hunter_path_feature_4'],
      14: ['tracking_mastery_4'],
      15: ['combat_trick_4'],
      16: ['mark_target_5'],
      17: ['hunter_path_feature_5'],
      18: ['tracking_mastery_5'],
      19: ['combat_trick_5'],
      20: ['perfect_bounty_hunter']
    },

    // Hybrid model: Star Wars uses PATHS
    paths: {
      tracker: {
        id: 'tracker',
        name: 'Tracker Path',
        description: 'Experts in wilderness pursuit, target prediction, and long-distance tracking.'
      },
      enforcer: {
        id: 'enforcer',
        name: 'Enforcer Path',
        description: 'Heavy-hitting hunters who rely on intimidation, brute force, and overwhelming firepower.'
      },
      gadgeteer: {
        id: 'gadgeteer',
        name: 'Gadgeteer Path',
        description: 'Tinkerers who use nets, traps, drones, and specialized capture devices.'
      },
      infiltrator: {
        id: 'infiltrator',
        name: 'Infiltrator Path',
        description: 'Stealthy hunters who excel at silent takedowns and covert captures.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You take up the hunt as a Star Wars Bounty Hunter.');
      player.setMeta('class', 'sw_bounty_hunter');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('hunter_path')) {
        player.setMeta('hunter_path', null);
      }

      // Mark target
      if (!player.getMeta('mark_target')) {
        player.setMeta('mark_target', {
          bonus: 0
        });
      }

      // Tracking mastery
      if (!player.getMeta('tracking_mastery')) {
        player.setMeta('tracking_mastery', {
          bonus: 0
        });
      }

      // Combat tricks
      if (!player.getMeta('combat_trick')) {
        player.setMeta('combat_trick', {
          known: [],
          active: null
        });
      }
    }
  };
};
