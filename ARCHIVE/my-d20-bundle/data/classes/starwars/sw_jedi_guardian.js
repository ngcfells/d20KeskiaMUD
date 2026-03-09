// bundles/my-d20-bundle/data/classes/starwars/sw_jedi_guardian.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  // Force power list (shared across Jedi classes)
  const forcePowers = require('../../force/force_powers');

  return {
    id: 'sw_jedi_guardian',
    name: 'Jedi Guardian (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'A disciplined warrior of the Jedi Order who channels the Force through martial prowess and lightsaber mastery.',

    hitDie: 10,

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'concentration',
      'diplomacy',
      'jump',
      'knowledge_galactic',
      'knowledge_religion',
      'perception',
      'pilot',
      'profession',
      'sense_motive',
      'tumble'
    ],

    abilities: {
      1: ['lightsaber_training', 'force_sensitivity', 'guardian_path_feature_1'],
      2: ['force_focus_1'],
      3: ['lightsaber_form_1'],
      4: ['force_power_1'],
      5: ['guardian_path_feature_2'],
      6: ['lightsaber_form_2'],
      7: ['force_focus_2'],
      8: ['force_power_2'],
      9: ['guardian_path_feature_3'],
      10: ['lightsaber_form_3'],
      11: ['force_focus_3'],
      12: ['force_power_3'],
      13: ['guardian_path_feature_4'],
      14: ['lightsaber_form_4'],
      15: ['force_focus_4'],
      16: ['force_power_4'],
      17: ['guardian_path_feature_5'],
      18: ['lightsaber_form_5'],
      19: ['force_focus_5'],
      20: ['perfect_jedi_guardian']
    },

    // Hybrid model: Star Wars uses PATHS
    paths: {
      ataru: {
        id: 'ataru',
        name: 'Ataru Form (Form IV)',
        description: 'An acrobatic, aggressive lightsaber form emphasizing speed, mobility, and overwhelming offense.'
      },
      soresu: {
        id: 'soresu',
        name: 'Soresu Form (Form III)',
        description: 'A defensive form focused on patience, precision, and impenetrable defense.'
      },
      shien_djem_so: {
        id: 'shien_djem_so',
        name: 'Shien / Djem So (Form V)',
        description: 'A form that channels strength and momentum, turning defense into powerful counterattacks.'
      },
      juyo_vaapad: {
        id: 'juyo_vaapad',
        name: 'Juyo / Vaapad (Form VII)',
        description: 'A ferocious, unpredictable form that channels emotional intensity into controlled aggression.'
      }
    },

    // Force power subsystem (normalized)
    spellcasting: {
      mode: 'spontaneous',
      ability: 'wisdom',
      spellList: forcePowers,

      // Jedi Guardians get fewer powers than Consulars
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
      Broadcast.sayAt(player, 'You walk the path of the Jedi Guardian.');
      player.setMeta('class', 'sw_jedi_guardian');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('guardian_path')) {
        player.setMeta('guardian_path', null);
      }

      // Lightsaber form progression
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
