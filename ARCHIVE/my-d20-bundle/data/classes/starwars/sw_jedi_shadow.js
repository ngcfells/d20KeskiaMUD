// bundles/my-d20-bundle/data/classes/starwars/sw_jedi_shadow.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const forcePowers = require('../../force/force_powers');

  return {
    id: 'sw_jedi_shadow',
    name: 'Jedi Shadow (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'A covert Jedi operative specializing in stealth, infiltration, and hunting dark side threats.',

    hitDie: 8,

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'concentration',
      'diplomacy',
      'hide',
      'investigate',
      'knowledge_galactic',
      'knowledge_religion',
      'listen',
      'move_silently',
      'perception',
      'profession',
      'sense_motive',
      'tumble'
    ],

    abilities: {
      1: ['force_sensitivity', 'shadow_training_1', 'shadow_path_feature_1'],
      2: ['force_focus_1'],
      3: ['shadow_step_1'],
      4: ['force_power_1'],
      5: ['shadow_path_feature_2'],
      6: ['shadow_training_2'],
      7: ['force_focus_2'],
      8: ['force_power_2'],
      9: ['shadow_path_feature_3'],
      10: ['shadow_step_2'],
      11: ['force_focus_3'],
      12: ['force_power_3'],
      13: ['shadow_path_feature_4'],
      14: ['shadow_training_3'],
      15: ['force_focus_4'],
      16: ['force_power_4'],
      17: ['shadow_path_feature_5'],
      18: ['shadow_step_3'],
      19: ['force_focus_5'],
      20: ['perfect_jedi_shadow']
    },

    // Hybrid model: Star Wars uses PATHS
    paths: {
      infiltrator: {
        id: 'infiltrator',
        name: 'Infiltrator Path',
        description: 'Masters of stealth, silent movement, and covert entry.'
      },
      investigator: {
        id: 'investigator',
        name: 'Investigator Path',
        description: 'Experts in deduction, interrogation, and uncovering hidden truths.'
      },
      darkhunter: {
        id: 'darkhunter',
        name: 'Dark Hunter Path',
        description: 'Specialists trained to track, counter, and neutralize dark side practitioners.'
      },
      shadow_sentinel: {
        id: 'shadow_sentinel',
        name: 'Shadow Sentinel Path',
        description: 'Guardians who blend stealth with defensive Force techniques.'
      }
    },

    // Force power subsystem (normalized)
    spellcasting: {
      mode: 'spontaneous',
      ability: 'wisdom',
      spellList: forcePowers,

      // Jedi Shadows sit between Guardian and Consular in power progression
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
      Broadcast.sayAt(player, 'You walk the hidden path of the Jedi Shadow.');
      player.setMeta('class', 'sw_jedi_shadow');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('shadow_path')) {
        player.setMeta('shadow_path', null);
      }

      // Shadow training bonuses
      if (!player.getMeta('shadow_training')) {
        player.setMeta('shadow_training', {
          bonus: 0
        });
      }

      // Shadow step (teleport/stealth hybrid)
      if (!player.getMeta('shadow_step')) {
        player.setMeta('shadow_step', {
          uses: 0,
          max: 0
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
