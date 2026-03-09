// bundles/my-d20-bundle/data/classes/oriental/ninja.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'ninja',
    name: 'Ninja',
    origin: 'rokugan',
    description: 'A shadow operative who blends stealth, sudden strikes, and ki techniques, trained in various secret schools.',
    hitDie: 6,

    classSkills: [
      'balance',
      'bluff',
      'climb',
      'craft',
      'disguise',
      'escape_artist',
      'hide',
      'intimidate',
      'jump',
      'knowledge_local',
      'listen',
      'move_silently',
      'perform',
      'profession',
      'search',
      'sense_motive',
      'sleight_of_hand',
      'spot',
      'tumble',
      'use_magic_device',
      'use_rope'
    ],

    abilities: {
      1: ['ninja_path', 'sudden_strike_1d6', 'trapfinding', 'ki_pool'],
      2: ['evasion'],
      3: ['ghost_step', 'sudden_strike_2d6'],
      4: ['uncanny_dodge'],
      5: ['ki_power_1', 'sudden_strike_3d6'],
      6: ['improved_poison_use'],
      7: ['ghost_step_invisible', 'sudden_strike_4d6'],
      8: ['improved_uncanny_dodge'],
      9: ['ki_power_2', 'sudden_strike_5d6'],
      10: ['acrobatic_charge'],
      11: ['ghost_walk', 'sudden_strike_6d6'],
      12: ['ki_power_3'],
      13: ['hide_in_plain_sight', 'sudden_strike_7d6'],
      14: ['improved_evasion'],
      15: ['ki_power_4', 'sudden_strike_8d6'],
      16: ['shadow_step'],
      17: ['ghost_sight', 'sudden_strike_9d6'],
      18: ['ki_power_5'],
      19: ['shadow_mastery', 'sudden_strike_10d6'],
      20: ['perfect_ghost_step']
    },

    // Unified paths:
    // - "shinobi": OA-style ninja (classic sudden strike/ki focus)
    // - "clan": Rokugan clan ninja (school techniques, kiho)
    // - "elite": Shinobi-style advanced techniques
    paths: {
      shinobi: {
        id: 'shinobi',
        name: 'Shinobi Path',
        description: 'Traditional shadow warrior, focused on stealth, sudden strikes, and lethal precision.'
      },
      clan: {
        id: 'clan',
        name: 'Clan Path',
        description: 'Rokugan-style clan ninja, trained in secret techniques and kiho of their lords.'
      },
      elite: {
        id: 'elite',
        name: 'Elite Path',
        description: 'An advanced shinobi, mastering the most dangerous and subtle techniques of the shadow arts.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You vanish into the shadows as a Ninja.');
      player.setMeta('class', 'ninja');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection (shinobi / clan / elite)
      if (!player.getMeta('ninja_path')) {
        player.setMeta('ninja_path', null);
      }

      // Ki pool and ki techniques
      if (!player.getMeta('ki_pool')) {
        player.setMeta('ki_pool', {
          max: 0,
          current: 0
        });
      }

      if (!player.getMeta('ninja_techniques')) {
        player.setMeta('ninja_techniques', {
          known: [],
          active: []
        });
      }
    }
  };
};
