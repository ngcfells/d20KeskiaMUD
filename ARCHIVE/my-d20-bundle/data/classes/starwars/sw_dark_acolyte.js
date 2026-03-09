// bundles/my-d20-bundle/data/classes/starwars/sw_dark_acolyte.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const forcePowers = require('../../force/force_powers');

  return {
    id: 'sw_dark_acolyte',
    name: 'Dark Side Acolyte (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'A novice practitioner of the dark side who channels anger, fear, and ambition into destructive Force abilities.',

    hitDie: 8,

    classSkills: [
      'acrobatics', 'athletics', 'concentration', 'intimidate',
      'knowledge_galactic', 'knowledge_religion', 'perception',
      'profession', 'sense_motive', 'spellcraft'
    ],

    abilities: {
      1: ['force_sensitivity', 'dark_corruption_1', 'acolyte_path_feature_1'],
      2: ['force_focus_1'],
      3: ['dark_power_1'],
      4: ['dark_corruption_2'],
      5: ['acolyte_path_feature_2'],
      6: ['force_focus_2'],
      7: ['dark_power_2'],
      8: ['dark_corruption_3'],
      9: ['acolyte_path_feature_3'],
      10: ['force_focus_3'],
      11: ['dark_power_3'],
      12: ['dark_corruption_4'],
      13: ['acolyte_path_feature_4'],
      14: ['force_focus_4'],
      15: ['dark_power_4'],
      16: ['dark_corruption_5'],
      17: ['acolyte_path_feature_5'],
      18: ['force_focus_5'],
      19: ['dark_power_5'],
      20: ['perfect_dark_acolyte']
    },

    // Hybrid model: Star Wars uses PATHS
    paths: {
      cultist: {
        id: 'cultist',
        name: 'Cultist Path',
        description: 'Members of dark side cults who channel forbidden rituals and ancient rites.'
      },
      fallen_mystic: {
        id: 'fallen_mystic',
        name: 'Fallen Mystic Path',
        description: 'Former adepts who turned to the dark side through despair, ambition, or corruption.'
      },
      rage_channeler: {
        id: 'rage_channeler',
        name: 'Rage Channeler Path',
        description: 'Acolytes who draw power from fury, hatred, and emotional intensity.'
      },
      shadow_initiate: {
        id: 'shadow_initiate',
        name: 'Shadow Initiate Path',
        description: 'Stealthy dark side users who blend deception with subtle Force manipulation.'
      }
    },

    // Force power subsystem (normalized)
    spellcasting: {
      mode: 'spontaneous',
      ability: 'wisdom',
      spellList: forcePowers,

      // Acolytes have a progression similar to Force Adepts
      spellSlots: {
        1:  { 1: 2 },
        2:  { 1: 3 },
        3:  { 1: 3, 2: 1 },
        4:  { 1: 4, 2: 1 },
        5:  { 1: 4, 2: 2 },
        6:  { 1: 4, 2: 2, 3: 1 },
        7:  { 1: 4, 2: 3, 3: 1 },
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
      Broadcast.sayAt(player, 'You embrace the path of the Dark Side Acolyte.');
      player.setMeta('class', 'sw_dark_acolyte');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('acolyte_path')) {
        player.setMeta('acolyte_path', null);
      }

      // Corruption tracking
      if (!player.getMeta('dark_corruption')) {
        player.setMeta('dark_corruption', {
          level: 0
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
