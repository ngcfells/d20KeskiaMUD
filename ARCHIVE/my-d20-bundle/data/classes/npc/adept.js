// bundles/my-d20-bundle/data/classes/npc/adept.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const adeptSpellList = require('../../spelllists/adept');

  return {
    id: 'adept',
    name: 'Adept',
    description: 'A minor divine spellcaster with limited magical ability.',
    hitDie: 6,

    classSkills: [
      'concentration',
      'craft',
      'heal',
      'knowledge_arcana',
      'knowledge_religion',
      'profession',
      'spellcraft'
    ],

    abilities: {
      1: ['familiar_adept'],
      5: ['summon_familiar_upgrade']
    },

    spellcasting: {
      mode: 'prepared',
      ability: 'wisdom',
      spellSlots: {
        1:  { 0: 3, 1: 1 },
        2:  { 0: 3, 1: 2 },
        3:  { 0: 3, 1: 2, 2: 1 },
        4:  { 0: 3, 1: 3, 2: 2 },
        5:  { 0: 3, 1: 3, 2: 2, 3: 1 },
        6:  { 0: 3, 1: 3, 2: 3, 3: 2 },
        7:  { 0: 3, 1: 4, 2: 3, 3: 2, 4: 1 },
        8:  { 0: 3, 1: 4, 2: 3, 3: 3, 4: 2 },
        9:  { 0: 3, 1: 4, 2: 4, 3: 3, 4: 2, 5: 1 },
        10: { 0: 3, 1: 4, 2: 4, 3: 3, 4: 3, 5: 2 }
      },
      spellList: adeptSpellList
    },

    setup: player => {
      Broadcast.sayAt(player, 'You walk the humble magical path of the Adept.');
      player.setMeta('class', 'adept');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      if (!player.getMeta('preparedSpells')) {
        player.setMeta('preparedSpells', {});
      }
    }
  };
};
