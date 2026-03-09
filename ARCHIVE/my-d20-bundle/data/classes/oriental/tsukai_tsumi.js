// bundles/my-d20-bundle/data/classes/oriental/tsukai_tsumi.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  // Hybrid corrupted spell list (SRD + PF + 5E + homebrew)
  const tsukaiSpellList = require('../../spelllists/maho');

  return {
    id: 'tsukai_tsumi',
    name: 'Tsukai-Tsumi',
    origin: 'rokugan',
    description: 'A corrupted spellcaster twisted by the Shadowlands Taint, wielding dark magic and unnatural mutations.',
    hitDie: 6,

    classSkills: [
      'concentration',
      'craft',
      'heal',
      'intimidate',
      'knowledge_arcana',
      'knowledge_religion',
      'knowledge_planes',
      'profession',
      'sense_motive',
      'spellcraft'
    ],

    abilities: {
      1: ['taint_seed', 'corrupted_spellcasting_1'],
      2: ['shadowlands_resilience_1'],
      3: ['taint_mutation_1'],
      4: ['corrupted_spellcasting_2'],
      5: ['dark_blessing_1'],
      6: ['taint_growth_1'],
      7: ['corrupted_spellcasting_3'],
      8: ['shadowlands_resilience_2'],
      9: ['taint_mutation_2'],
      10: ['dark_blessing_2'],
      11: ['corrupted_spellcasting_4'],
      12: ['taint_growth_2'],
      13: ['shadowlands_resilience_3'],
      14: ['taint_mutation_3'],
      15: ['dark_blessing_3'],
      16: ['corrupted_spellcasting_5'],
      17: ['taint_growth_3'],
      18: ['shadowlands_resilience_4'],
      19: ['taint_mutation_4'],
      20: ['perfect_corruption']
    },

    spellcasting: {
      mode: 'prepared',
      ability: 'charisma',

      // Tsukai-Tsumi uses a corrupted full-caster progression
      spellSlots: {
        1:  { 0: 3, 1: 1 },
        2:  { 0: 4, 1: 2 },
        3:  { 0: 4, 1: 2, 2: 1 },
        4:  { 0: 4, 1: 3, 2: 2 },
        5:  { 0: 4, 1: 3, 2: 2, 3: 1 },
        6:  { 0: 4, 1: 3, 2: 3, 3: 2 },
        7:  { 0: 4, 1: 4, 2: 3, 3: 2, 4: 1 },
        8:  { 0: 4, 1: 4, 2: 3, 3: 3, 4: 2 },
        9:  { 0: 4, 1: 4, 2: 4, 3: 3, 4: 2, 5: 1 },
        10: { 0: 4, 1: 4, 2: 4, 3: 3, 4: 3, 5: 2 },
        11: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 3, 5: 2, 6: 1 },
        12: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 3, 5: 3, 6: 2 },
        13: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 3, 6: 2, 7: 1 },
        14: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 3, 6: 3, 7: 2 },
        15: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 3, 7: 2, 8: 1 },
        16: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 3, 7: 3, 8: 2 },
        17: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 3, 8: 2, 9: 1 },
        18: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 3, 8: 3, 9: 2 },
        19: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 3, 9: 3 },
        20: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4 }
      },

      spellList: tsukaiSpellList
    },

    setup: player => {
      Broadcast.sayAt(player, 'The Shadowlands Taint seeps into your soul as you become a Tsukai-Tsumi.');
      player.setMeta('class', 'tsukai_tsumi');
      
      // Intrinsic Mother Cyst bypass
      // This allows the player to cast necrotic_cyst spells without the feat
      player.setMeta('intrinsic_feats', ['mother_cyst']);
      
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Taint tracking
      if (!player.getMeta('taint')) {
        player.setMeta('taint', {
          score: 1,
          mutations: []
        });
      }

      // Corrupted spells
      if (!player.getMeta('preparedSpells')) {
        player.setMeta('preparedSpells', {});
      }

      // Dark blessings
      if (!player.getMeta('dark_blessings')) {
        player.setMeta('dark_blessings', []);
      }
    }
  };
};
