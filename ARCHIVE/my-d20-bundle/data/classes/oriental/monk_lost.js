// bundles/my-d20-bundle/data/classes/oriental/monk_lost.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  // Corrupted Kiho and obsidian techniques loaded from data files
  const corruptedKiho = require('../../ki/corrupted_kiho');
  const abyssalStances = require('../../ki/monk_stances').advanced_stances; // Use abyssal logic
  const obsidianTattoos = require('../../ki/lost_monk_abilities').obsidian_tattoos;

  return {
    id: 'monk_lost',
    name: 'Monk (The Lost)',
    origin: 'rokugan',
    description: 'A fallen ascetic who has surrendered their soul to the Taint, channeling the dark power of Jigoku through corrupted martial arts.',
    hitDie: 10, // The Lost are preternaturally resilient

    classSkills: [
      'athletics',
      'balance',
      'climb',
      'concentration',
      'hide',
      'intimidate',
      'jump',
      'knowledge_shadowlands',
      'listen',
      'move_silently',
      'sense_motive',
      'tumble'
    ],

    abilities: {
      1: ['taint_pool', 'unarmed_strike_1', 'abyssal_stance_1'],
      2: ['shadowlands_resilience_1'],
      3: ['corrupted_kiho_1'],
      4: ['taint_mutation_1'],
      5: ['unarmed_strike_2'],
      6: ['corrupted_kiho_2'],
      7: ['consume_flesh'],
      8: ['abyssal_stance_2'],
      9: ['corrupted_kiho_3'],
      10: ['unarmed_strike_3'],
      11: ['obsidian_soul'],
      12: ['corrupted_kiho_4'],
      13: ['abyssal_stance_3'],
      14: ['unarmed_strike_4'],
      15: ['corrupted_kiho_5'],
      16: ['eternal_corruption'],
      17: ['abyssal_stance_4'],
      18: ['corrupted_kiho_6'],
      19: ['perfect_dissolution'],
      20: ['unarmed_strike_5']
    },

    // Obsidian Tattoo path for the Tainted
    tattooPaths: {
      obsidian: {
        id: 'obsidian',
        name: 'Obsidian Tattooed Monk',
        description: 'A lost monk whose body is etched with ink made from obsidian and blood, granting horrific powers.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'The purity of your ki rots as you become one of the Lost.');
      player.setMeta('class', 'monk_lost');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Taint pool (Replaces Ki)
      if (!player.getMeta('taint_pool')) {
        player.setMeta('taint_pool', {
          max: 0,
          current: 0,
          score: 1 // Starting Taint Score
        });
      }

      // Corrupted Kiho techniques
      if (!player.getMeta('corrupted_kiho')) {
        player.setMeta('corrupted_kiho', {
          known: [],
          active: []
        });
      }

      // Abyssal stances
      if (!player.getMeta('monk_stances')) {
        player.setMeta('monk_stances', {
          known: [],
          active: null
        });
      }

      // Obsidian Tattoos
      if (!player.getMeta('monk_tattoos')) {
        player.setMeta('monk_tattoos', {
          enabled: false,
          known: []
        });
      }
    }
  };
};
