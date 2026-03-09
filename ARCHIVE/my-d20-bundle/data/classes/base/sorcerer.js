// bundles/my-d20-bundle/data/classes/base/sorcerer.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const sorcererSpellList = require('../../spelllists/sorcerer');

  return {
    id: 'sorcerer',
    name: 'Sorcerer',
    description: 'A natural arcane caster whose magic comes from innate power.',
    hitDie: 6,
    classSkills: [
      'bluff',
      'concentration',
      'craft',
      'knowledge_arcana',
      'profession',
      'spellcraft'
    ],
    abilities: {
      1: ['sorcerer_bloodline', 'eschew_materials'],
      7: ['bloodline_power_2'],
      13: ['bloodline_power_3'],
      19: ['bloodline_power_4']
    },
    spellcasting: {
      mode: 'spontaneous',
      ability: 'charisma',
      spellSlots: {
        1:  { 0: 5, 1: 3 },
        2:  { 0: 6, 1: 4 },
        3:  { 0: 6, 1: 5, 2: 3 },
        4:  { 0: 6, 1: 6, 2: 4 },
        5:  { 0: 6, 1: 6, 2: 5, 3: 3 },
        6:  { 0: 6, 1: 6, 2: 6, 3: 4 },
        7:  { 0: 6, 1: 6, 2: 6, 3: 5, 4: 3 },
        8:  { 0: 6, 1: 6, 2: 6, 3: 6, 4: 4 },
        9:  { 0: 6, 1: 6, 2: 6, 3: 6, 4: 5, 5: 3 },
        10: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 4 },
        11: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 5, 6: 3 },
        12: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 4 },
        13: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 5, 7: 3 },
        14: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 4 },
        15: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 5, 8: 3 },
        16: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 6, 8: 4 },
        17: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 6, 8: 5, 9: 3 },
        18: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 6, 8: 6, 9: 4 },
        19: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 6, 8: 6, 9: 5 },
        20: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 6, 8: 6, 9: 6 }
      },
      spellList: sorcererSpellList
    },
    setup: player => {
      Broadcast.sayAt(player, 'You embrace the path of the Sorcerer.');
      player.setMeta('class', 'sorcerer');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      if (!player.getMeta('knownSpells')) {
        player.setMeta('knownSpells', {});
      }

      if (!player.getMeta('bloodline')) {
        player.setMeta('bloodline', null);
      }
    }
  };
};
