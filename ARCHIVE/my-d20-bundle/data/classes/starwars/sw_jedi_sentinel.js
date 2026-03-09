// bundles/my-d20-bundle/data/classes/starwars/sw_jedi_sentinel.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const forcePowers = require('../../force/force_powers');

  return {
    id: 'sw_jedi_sentinel',
    name: 'Jedi Sentinel (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'A balanced Jedi who blends martial skill, Force ability, investigation, and practical problem-solving.',

    hitDie: 8,

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'computers',
      'concentration',
      'diplomacy',
      'investigate',
      'knowledge_galactic',
      'knowledge_religion',
      'mechanics',
      'perception',
      'profession',
      'sense_motive',
      'tumble'
    ],

    abilities: {
      1: ['force_sensitivity', 'sentinel_training_1', 'sentinel_path_feature_1'],
      2: ['force_focus_1'],
      3: ['lightsaber_form_1'],
      4: ['force_power_1'],
      5: ['sentinel_path_feature_2'],
      6: ['sentinel_training_2'],
      7: ['force_focus_2'],
      8: ['force_power_2'],
      9: ['sentinel_path_feature_3'],
      10: ['lightsaber_form_2'],
      11: ['force_focus_3'],
      12: ['force_power_3'],
      13: ['sentinel_path_feature_4'],
      14: ['sentinel_training_3'],
      15: ['force_focus_4'],
      16: ['force_power_4'],
      17: ['sentinel_path_feature_5'],
      18: ['lightsaber_form_3'],
      19: ['force_focus_5'],
      20: ['perfect_jedi_sentinel']
    },

    // Hybrid model: Star Wars uses PATHS
    paths: {
      investigator: {
        id: 'investigator',
        name: 'Investigator Path',
        description: 'Experts in deduction, analysis, and uncovering hidden truths.'
      },
      artisan: {
        id: 'artisan',
        name: 'Artisan Path',
        description: 'Technically skilled Jedi who excel in crafting, mechanics, and problem-solving.'
      },
      warden: {
        id: 'warden',
        name: 'Warden Path',
        description: 'Protectors who balance martial skill with vigilance against corruption and injustice.'
      },
      mediator: {
        id: 'mediator',
        name: 'Mediator Path',
        description: 'Negotiators who resolve conflict through diplomacy, insight, and balanced judgment.'
      }
    },

    // Force power subsystem (normalized)
    spellcasting: {
      mode: 'spontaneous',
      ability: 'wisdom',
      spellList: forcePowers,

      // Sentinel sits between Guardian and Consular
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
      Broadcast.sayAt(player, 'You walk the balanced path of the Jedi Sentinel.');
      player.setMeta('class', 'sw_jedi_sentinel');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('sentinel_path')) {
        player.setMeta('sentinel_path', null);
      }

      // Sentinel training bonuses
      if (!player.getMeta('sentinel_training')) {
        player.setMeta('sentinel_training', {
          bonus: 0
        });
      }

      // Lightsaber forms
      if (!player.getMeta('lightsaber_forms')) {
        player.setMeta('lightsaber_forms', {
          known: [],
          active: null
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
