// bundles/my-d20-bundle/data/classes/complete_arcane/warlock.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  // Invocation lists (least, lesser, greater, dark)
  const invocationList = require('../../invocations/warlock_invocations');

  return {
    id: 'warlock',
    name: 'Warlock',
    description: 'A wielder of eldritch power who channels arcane might through invocations and a growing eldritch blast.',
    hitDie: 6,

    classSkills: [
      'bluff',
      'concentration',
      'craft',
      'disguise',
      'intimidate',
      'jump',
      'knowledge_arcana',
      'knowledge_planes',
      'profession',
      'sense_motive',
      'spellcraft',
      'use_magic_device'
    ],

    abilities: {
      1: ['eldritch_blast_1d6', 'invocations_least_1', 'pact_boon_1'],
      2: ['damage_reduction_1'],
      3: ['eldritch_blast_2d6'],
      4: ['invocations_least_2'],
      5: ['pact_boon_2'],
      6: ['eldritch_blast_3d6', 'damage_reduction_2'],
      7: ['invocations_lesser_1'],
      8: ['eldritch_blast_4d6'],
      9: ['pact_boon_3'],
      10: ['invocations_lesser_2', 'damage_reduction_3'],
      11: ['eldritch_blast_5d6'],
      12: ['invocations_greater_1'],
      13: ['pact_boon_4'],
      14: ['eldritch_blast_6d6', 'damage_reduction_4'],
      15: ['invocations_greater_2'],
      16: ['eldritch_blast_7d6'],
      17: ['pact_boon_5'],
      18: ['invocations_dark_1', 'damage_reduction_5'],
      19: ['eldritch_blast_8d6'],
      20: ['invocations_dark_2', 'perfect_eldritch_mastery']
    },

    // Warlocks do NOT use spell slots — they use invocations
    spellcasting: null,

    invocations: {
      list: invocationList,
      tiers: ['least', 'lesser', 'greater', 'dark']
    },

    setup: player => {
      Broadcast.sayAt(player, 'Eldritch power flows through your veins as you become a Warlock.');
      player.setMeta('class', 'warlock');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Eldritch blast tracking
      if (!player.getMeta('eldritch_blast')) {
        player.setMeta('eldritch_blast', {
          damage: '1d6'
        });
      }

      // Known invocations
      if (!player.getMeta('invocations')) {
        player.setMeta('invocations', {
          least: [],
          lesser: [],
          greater: [],
          dark: []
        });
      }

      // Pact boons
      if (!player.getMeta('pact_boons')) {
        player.setMeta('pact_boons', []);
      }
    }
  };
};
