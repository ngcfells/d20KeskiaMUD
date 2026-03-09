// bundles/my-d20-bundle/data/classes/oriental/scout.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'rok_scout',
    name: 'Rokugan Scout',
    origin: 'rokugan',
    description: 'A swift and perceptive warrior who excels at reconnaissance, skirmishing, and survival in the wilds.',
    hitDie: 8,

    classSkills: [
      'balance',
      'climb',
      'craft',
      'escape_artist',
      'hide',
      'jump',
      'knowledge_geography',
      'knowledge_nature',
      'listen',
      'move_silently',
      'profession',
      'ride',
      'search',
      'spot',
      'survival',
      'tumble',
      'use_rope'
    ],

    abilities: {
      1: ['skirmish_1d6_ac1', 'track', 'fast_movement_1'],
      2: ['battle_fortitude_1'],
      3: ['trapfinding'],
      4: ['skirmish_2d6_ac1'],
      5: ['uncanny_dodge'],
      6: ['flawless_stride'],
      7: ['skirmish_3d6_ac2'],
      8: ['camouflage'],
      9: ['battle_fortitude_2'],
      10: ['skirmish_4d6_ac2'],
      11: ['improved_uncanny_dodge'],
      12: ['hide_in_plain_sight'],
      13: ['skirmish_5d6_ac3'],
      14: ['swift_tracker'],
      15: ['battle_fortitude_3'],
      16: ['skirmish_6d6_ac3'],
      17: ['blindsense_30'],
      18: ['free_movement'],
      19: ['skirmish_7d6_ac4'],
      20: ['perfect_skirmisher']
    },

    // Rokugan wilderness traditions (optional flavor paths)
    traditions: {
      unicorn: {
        id: 'unicorn',
        name: 'Unicorn Scout Tradition',
        description: 'Masters of mounted scouting, foreign travel, and rapid movement.'
      },
      crab: {
        id: 'crab',
        name: 'Crab Scout Tradition',
        description: 'Hardened border scouts trained to survive the Shadowlands.'
      },
      dragon: {
        id: 'dragon',
        name: 'Dragon Scout Tradition',
        description: 'Silent mountain watchers skilled in ambush and misdirection.'
      },
      ronin: {
        id: 'ronin',
        name: 'Ronin Scout Tradition',
        description: 'Independent wanderers relying on adaptability and instinct.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You take to the wilds as a Scout.');
      player.setMeta('class', 'rok_scout');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Tradition selection (optional)
      if (!player.getMeta('scout_tradition')) {
        player.setMeta('scout_tradition', null);
      }

      // Skirmish tracking
      if (!player.getMeta('skirmish')) {
        player.setMeta('skirmish', {
          damage: 0,
          ac: 0
        });
      }

      // Battle fortitude bonuses
      if (!player.getMeta('battle_fortitude')) {
        player.setMeta('battle_fortitude', {
          bonus: 0
        });
      }
    }
  };
};
