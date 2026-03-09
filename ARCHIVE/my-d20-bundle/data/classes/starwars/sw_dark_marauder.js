// bundles/my-d20-bundle/data/classes/starwars/sw_dark_marauder.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const forcePowers = require('../../force/force_powers');

  return {
    id: 'sw_dark_marauder',
    name: 'Dark Side Marauder (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'A brutal dark side warrior who channels rage, hatred, and raw power into devastating melee combat.',

    hitDie: 12,

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
      1: ['force_sensitivity', 'dark_rage_1', 'marauder_path_feature_1'],
      2: ['force_focus_1'],
      3: ['dark_strike_1'],
      4: ['dark_corruption_1'],
      5: ['marauder_path_feature_2'],
      6: ['dark_rage_2'],
      7: ['force_focus_2'],
      8: ['dark_strike_2'],
      9: ['marauder_path_feature_3'],
      10: ['dark_corruption_2'],
      11: ['force_focus_3'],
      12: ['dark_strike_3'],
      13: ['marauder_path_feature_4'],
      14: ['dark_rage_3'],
      15: ['force_focus_4'],
      16: ['dark_strike_4'],
      17: ['marauder_path_feature_5'],
      18: ['dark_corruption_3'],
      19: ['force_focus_5'],
      20: ['perfect_dark_marauder']
    },

    // Hybrid model: Star Wars uses PATHS
    paths: {
      berserker: {
        id: 'berserker',
        name: 'Berserker Path',
        description: 'Warriors who unleash overwhelming fury, sacrificing defense for unstoppable offense.'
      },
      executioner: {
        id: 'executioner',
        name: 'Executioner Path',
        description: 'Cold, efficient killers who channel the dark side into precise, lethal strikes.'
      },
      tormentor: {
        id: 'tormentor',
        name: 'Tormentor Path',
        description: 'Marauders who blend physical brutality with fear, intimidation, and psychological dominance.'
      },
      blood_channeler: {
        id: 'blood_channeler',
        name: 'Blood Channeler Path',
        description: 'Dark warriors who draw strength from pain, sacrifice, and the suffering of others.'
      }
    },

    // Force power subsystem (normalized)
    spellcasting: {
      mode: 'spontaneous',
      ability: 'wisdom',
      spellList: forcePowers,

      // Marauders get fewer powers than Acolytes, more than pure martial classes
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
      Broadcast.sayAt(player, 'You embrace fury and power as a Dark Side Marauder.');
      player.setMeta('class', 'sw_dark_marauder');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('marauder_path')) {
        player.setMeta('marauder_path', null);
      }

      // Dark rage
      if (!player.getMeta('dark_rage')) {
        player.setMeta('dark_rage', {
          bonus: 0
        });
      }

      // Dark strike
      if (!player.getMeta('dark_strike')) {
        player.setMeta('dark_strike', {
          bonus: 0
        });
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
