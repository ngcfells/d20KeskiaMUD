// bundles/my-d20-bundle/data/classes/starwars/sw_jedi_consular.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  // Shared Force power list
  const forcePowers = require('../../force/force_powers');

  return {
    id: 'sw_jedi_consular',
    name: 'Jedi Consular (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'A wise and contemplative Jedi who focuses on diplomacy, healing, and mastery of the Force.',

    hitDie: 8,

    classSkills: [
      'acrobatics',
      'concentration',
      'diplomacy',
      'heal',
      'knowledge_galactic',
      'knowledge_religion',
      'linguistics',
      'perception',
      'profession',
      'sense_motive',
      'spellcraft'
    ],

    abilities: {
      1: ['force_sensitivity', 'consular_path_feature_1'],
      2: ['force_focus_1'],
      3: ['force_power_1'],
      4: ['insight_1'],
      5: ['consular_path_feature_2'],
      6: ['force_focus_2'],
      7: ['force_power_2'],
      8: ['insight_2'],
      9: ['consular_path_feature_3'],
      10: ['force_focus_3'],
      11: ['force_power_3'],
      12: ['insight_3'],
      13: ['consular_path_feature_4'],
      14: ['force_focus_4'],
      15: ['force_power_4'],
      16: ['insight_4'],
      17: ['consular_path_feature_5'],
      18: ['force_focus_5'],
      19: ['force_power_5'],
      20: ['perfect_jedi_consular']
    },

    // Hybrid model: Star Wars uses PATHS
    paths: {
      seer: {
        id: 'seer',
        name: 'Seer Path',
        description: 'Mystics who focus on foresight, prophecy, and deep communion with the Force.'
      },
      healer: {
        id: 'healer',
        name: 'Healer Path',
        description: 'Jedi who specialize in restoration, protection, and the mending of body and spirit.'
      },
      diplomat: {
        id: 'diplomat',
        name: 'Diplomat Path',
        description: 'Masters of negotiation, peacekeeping, and resolving conflict without violence.'
      },
      sage: {
        id: 'sage',
        name: 'Sage Path',
        description: 'Scholars who pursue knowledge, philosophy, and mastery of esoteric Force techniques.'
      }
    },

    // Force power subsystem (normalized)
    spellcasting: {
      mode: 'spontaneous',
      ability: 'wisdom',
      spellList: forcePowers,

      // Consulars get more powers than Guardians
      spellSlots: {
        1:  { 1: 2 },
        2:  { 1: 3 },
        3:  { 1: 3, 2: 1 },
        4:  { 1: 4, 2: 1 },
        5:  { 1: 4, 2: 2 },
        6:  { 1: 4, 2: 2, 3: 1 },
        7:  { 1: 5, 2: 2, 3: 1 },
        8:  { 1: 5, 2: 3, 3: 2 },
        9:  { 1: 5, 2: 3, 3: 2, 4: 1 },
        10: { 1: 5, 2: 3, 3: 3, 4: 1 },
        11: { 1: 5, 2: 4, 3: 3, 4: 2 },
        12: { 1: 5, 2: 4, 3: 3, 4: 2, 5: 1 },
        13: { 1: 5, 2: 4, 3: 4, 4: 2, 5: 1 },
        14: { 1: 5, 2: 4, 3: 4, 4: 3, 5: 2 },
        15: { 1: 5, 2: 4, 3: 4, 4: 3, 5: 2, 6: 1 },
        16: { 1: 5, 2: 4, 3: 4, 4: 4, 5: 3, 6: 1 },
        17: { 1: 5, 2: 4, 3: 4, 4: 4, 5: 3, 6: 2 },
        18: { 1: 5, 2: 4, 3: 4, 4: 4, 5: 4, 6: 2 },
        19: { 1: 5, 2: 4, 3: 4, 4: 4, 5: 4, 6: 3 },
        20: { 1: 5, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4 }
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You walk the path of the Jedi Consular.');
      player.setMeta('class', 'sw_jedi_consular');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('consular_path')) {
        player.setMeta('consular_path', null);
      }

      // Force power tracking
      if (!player.getMeta('force_powers')) {
        player.setMeta('force_powers', {
          known: [],
          active: []
        });
      }

      // Insight bonuses
      if (!player.getMeta('insight')) {
        player.setMeta('insight', {
          bonus: 0
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
