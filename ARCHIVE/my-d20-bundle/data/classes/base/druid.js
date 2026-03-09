// bundles/my-d20-bundle/data/classes/base/druid.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const druidSpellList = require('../../spelllists/druid');

  return {
    id: 'druid',
    name: 'Druid',
    description: 'A divine spellcaster who draws power from nature.',
    hitDie: 8,
    classSkills: [
      'concentration',
      'craft',
      'diplomacy',
      'handle_animal',
      'heal',
      'knowledge_nature',
      'knowledge_geography',
      'knowledge_planes',
      'listen',
      'profession',
      'ride',
      'spellcraft',
      'spot',
      'survival',
      'swim'
    ],
    abilities: {
      1: ['nature_sense', 'wild_empathy'],
      2: ['woodland_stride'],
      3: ['trackless_step'],
      4: ['resist_natures_lure', 'wild_shape_1'],
      5: ['wild_shape_2'],
      8: ['wild_shape_3'],
      11: ['wild_shape_4'],
      16: ['wild_shape_elemental']
    },
    spellcasting: {
      mode: 'prepared',
      ability: 'wisdom',
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
      spellList: druidSpellList
    },
    setup: (player, state) => {
      Broadcast.sayAt(player, 'You walk the path of the Druid.');
      player.setMeta('class', 'druid');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      if (!player.getMeta('preparedSpells')) {
        player.setMeta('preparedSpells', {});
      }

      // Druidic language exposure
      if (state && state.LanguageManager) {
        state.LanguageManager.gainExposure(player, 'druidic', 100);
      }
    }
  };
};
