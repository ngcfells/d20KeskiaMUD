// bundles/my-d20-bundle/data/classes/starwars/sw_force_adept.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const forcePowers = require('../../force/force_powers');

  return {
    id: 'sw_force_adept',
    name: 'Force Adept (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'A self-taught or tradition-trained Force user outside the Jedi Order, guided by instinct, ritual, or mysticism.',

    hitDie: 8,

    classSkills: [
      'acrobatics',
      'concentration',
      'diplomacy',
      'heal',
      'knowledge_galactic',
      'knowledge_religion',
      'knowledge_nature',
      'linguistics',
      'perception',
      'profession',
      'sense_motive',
      'spellcraft',
      'survival'
    ],

    abilities: {
      1: ['force_sensitivity', 'adept_path_feature_1'],
      2: ['force_focus_1'],
      3: ['force_power_1'],
      4: ['mystic_insight_1'],
      5: ['adept_path_feature_2'],
      6: ['force_focus_2'],
      7: ['force_power_2'],
      8: ['mystic_insight_2'],
      9: ['adept_path_feature_3'],
      10: ['force_focus_3'],
      11: ['force_power_3'],
      12: ['mystic_insight_3'],
      13: ['adept_path_feature_4'],
      14: ['force_focus_4'],
      15: ['force_power_4'],
      16: ['mystic_insight_4'],
      17: ['adept_path_feature_5'],
      18: ['force_focus_5'],
      19: ['force_power_5'],
      20: ['perfect_force_adept']
    },

    // Hybrid model: Star Wars uses PATHS
    paths: {
      shaman: {
        id: 'shaman',
        name: 'Shaman Path',
        description: 'Mystics who commune with spirits, ancestors, or natural energies through ritual and trance.'
      },
      prophet: {
        id: 'prophet',
        name: 'Prophet Path',
        description: 'Visionaries who wield the Force through intuition, foresight, and symbolic interpretation.'
      },
      witch: {
        id: 'witch',
        name: 'Witch Path',
        description: 'Practitioners of esoteric Force traditions, charms, curses, and ritual magic.'
      },
      hermit: {
        id: 'hermit',
        name: 'Hermit Path',
        description: 'Solitary adepts who develop unique Force techniques through isolation and introspection.'
      }
    },

    // Force power subsystem (normalized)
    spellcasting: {
      mode: 'spontaneous',
      ability: 'wisdom',
      spellList: forcePowers,

      // Adepts get a progression similar to Consulars but with fewer high-level slots
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
      Broadcast.sayAt(player, 'You awaken to the mysteries of the Force as a Force Adept.');
      player.setMeta('class', 'sw_force_adept');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('adept_path')) {
        player.setMeta('adept_path', null);
      }

      // Mystic insight bonuses
      if (!player.getMeta('mystic_insight')) {
        player.setMeta('mystic_insight', {
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
