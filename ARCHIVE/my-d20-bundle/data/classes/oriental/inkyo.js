// bundles/my-d20-bundle/data/classes/oriental/inkyo.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  // Kiho and contemplative techniques
  const kihoList = require('../../ki/kiho_powers');
  const meditationList = require('../../ki/inkyo_meditations');

  return {
    id: 'inkyo',
    name: 'Inkyo',
    origin: 'rokugan',
    description: 'A retired monk or scholar who has turned inward, mastering contemplation, lore, and subtle ki techniques.',
    hitDie: 6,

    classSkills: [
      'concentration',
      'craft',
      'diplomacy',
      'heal',
      'knowledge_history',
      'knowledge_religion',
      'knowledge_arcana',
      'knowledge_nature',
      'listen',
      'profession',
      'sense_motive',
      'spellcraft'
    ],

    abilities: {
      1: ['inkyo_meditation_1', 'lore_mastery_1', 'ki_pool_small'],
      2: ['still_mind'],
      3: ['inkyo_kiho_1'],
      4: ['insight_bonus_1'],
      5: ['inkyo_meditation_2'],
      6: ['lore_mastery_2'],
      7: ['inkyo_kiho_2'],
      8: ['insight_bonus_2'],
      9: ['inkyo_meditation_3'],
      10: ['lore_mastery_3'],
      11: ['inkyo_kiho_3'],
      12: ['insight_bonus_3'],
      13: ['inkyo_meditation_4'],
      14: ['lore_mastery_4'],
      15: ['inkyo_kiho_4'],
      16: ['insight_bonus_4'],
      17: ['inkyo_meditation_5'],
      18: ['lore_mastery_5'],
      19: ['inkyo_kiho_5'],
      20: ['perfect_contemplation']
    },

    setup: player => {
      Broadcast.sayAt(player, 'You withdraw from the world and walk the contemplative path of the Inkyo.');
      player.setMeta('class', 'inkyo');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Ki pool (smaller than Monk)
      if (!player.getMeta('ki_pool')) {
        player.setMeta('ki_pool', {
          max: 0,
          current: 0
        });
      }

      // Kiho known
      if (!player.getMeta('inkyo_kiho')) {
        player.setMeta('inkyo_kiho', {
          known: [],
          active: []
        });
      }

      // Meditations known
      if (!player.getMeta('inkyo_meditations')) {
        player.setMeta('inkyo_meditations', {
          known: [],
          active: null
        });
      }

      // Lore mastery bonuses
      if (!player.getMeta('lore_mastery')) {
        player.setMeta('lore_mastery', {
          bonus: 0
        });
      }

      // Insight bonuses
      if (!player.getMeta('insight_bonus')) {
        player.setMeta('insight_bonus', {
          ac: 0,
          saves: 0,
          skills: 0
        });
      }
    }
  };
};
