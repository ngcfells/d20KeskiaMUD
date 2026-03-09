// bundles/my-d20-bundle/data/classes/starwars/sw_force_warrior.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const forcePowers = require('../../force/force_powers');

  return {
    id: 'sw_force_warrior',
    name: 'Force Warrior (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'A martial Force user who channels the Force directly into physical combat, instinct, and raw power.',

    hitDie: 10,

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'concentration',
      'intimidate',
      'knowledge_galactic',
      'knowledge_religion',
      'perception',
      'profession',
      'sense_motive',
      'survival',
      'tumble'
    ],

    abilities: {
      1: ['force_sensitivity', 'force_strike_1', 'warrior_path_feature_1'],
      2: ['force_focus_1'],
      3: ['force_guard_1'],
      4: ['force_power_1'],
      5: ['warrior_path_feature_2'],
      6: ['force_strike_2'],
      7: ['force_focus_2'],
      8: ['force_power_2'],
      9: ['warrior_path_feature_3'],
      10: ['force_guard_2'],
      11: ['force_focus_3'],
      12: ['force_power_3'],
      13: ['warrior_path_feature_4'],
      14: ['force_strike_3'],
      15: ['force_focus_4'],
      16: ['force_power_4'],
      17: ['warrior_path_feature_5'],
      18: ['force_guard_3'],
      19: ['force_focus_5'],
      20: ['perfect_force_warrior']
    },

    // Hybrid model: Star Wars uses PATHS
    paths: {
      battle_trance: {
        id: 'battle_trance',
        name: 'Battle Trance Path',
        description: 'Warriors who enter a Force-guided trance, enhancing instinct, speed, and precision.'
      },
      guardian_spirit: {
        id: 'guardian_spirit',
        name: 'Guardian Spirit Path',
        description: 'Defenders who channel the Force into protective barriers and resilience.'
      },
      primal_channeler: {
        id: 'primal_channeler',
        name: 'Primal Channeler Path',
        description: 'Force users who draw on raw emotion and instinct to empower their strikes.'
      },
      ascetic_blade: {
        id: 'ascetic_blade',
        name: 'Ascetic Blade Path',
        description: 'Monastic warriors who blend martial discipline with focused Force techniques.'
      }
    },

    // Force power subsystem (normalized)
    spellcasting: {
      mode: 'spontaneous',
      ability: 'wisdom',
      spellList: forcePowers,

      // Force Warriors sit between Guardian and Adept in progression
      spellSlots: {
        1:  { 1: 1 },
        2:  { 1: 2 },
        3:  { 1: 2, 2: 1 },
        4:  { 1: 3, 2: 1 },
        5:  { 1: 3, 2: 2 },
        6:  { 1: 3, 2: 2, 3: 1 },
        7:  { 1: 4, 2: 2, 3: 1 },
        8:  { 1: 4, 2: 3, 3: 2 },
        9:  { 1: 4, 2: 3, 3: 2, 4: 1 },
        10: { 1: 4, 2: 3, 3: 3, 4: 1 },
        11: { 1: 4, 2: 4, 3: 3, 4: 2 },
        12: { 1: 4, 2: 4, 3: 3, 4: 2, 5: 1 },
        13: { 1: 4, 2: 4, 3: 4, 4: 2, 5: 1 },
        14: { 1: 4, 2: 4, 3: 4, 4: 3, 5: 2 },
        15: { 1: 4, 2: 4, 3: 4, 4: 3, 5: 2, 6: 1 },
        16: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 3, 6: 1 },
        17: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 3, 6: 2 },
        18: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 2 },
        19: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 3 },
        20: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4 }
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You channel the Force into martial might as a Force Warrior.');
      player.setMeta('class', 'sw_force_warrior');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('warrior_path')) {
        player.setMeta('warrior_path', null);
      }

      // Force strike
      if (!player.getMeta('force_strike')) {
        player.setMeta('force_strike', {
          bonus: 0
        });
      }

      // Force guard
      if (!player.getMeta('force_guard')) {
        player.setMeta('force_guard', {
          bonus: 0
        });
      }

      // Force power tracking
      if (!player.getMeta('force_powers')) {
        player.setMeta('force_powers', {
          known: [],
          active: []
        });
      }

      // Force focus
      if (!player.getMeta('force_focus')) {
        player.setMeta('force_focus', {
          bonus: 0
        });
      }
    }
  };
};
