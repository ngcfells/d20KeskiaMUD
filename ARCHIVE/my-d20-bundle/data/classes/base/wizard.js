
// bundles/my-d20-bundle/data/classes/base/wizard.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const wizardSpellList = require('../../spelllists/wizard');

  return {
    id: 'wizard',
    name: 'Wizard',
    description: 'A master of arcane spellcasting and knowledge.',
    hitDie: 4,
    classSkills: [
      'concentration',
      'craft',
      'knowledge_arcana',
      'knowledge_dungeoneering',
      'knowledge_geography',
      'knowledge_history',
      'knowledge_local',
      'knowledge_nature',
      'knowledge_nobility',
      'knowledge_planes',
      'knowledge_religion',
      'profession',
      'spellcraft'
    ],
    abilities: {
      1: [
        'summon_familiar',
        'scribe_scroll'
      ],
      5: ['wizard_bonus_feat'],
      10: ['wizard_bonus_feat'],
      15: ['wizard_bonus_feat'],
      20: ['wizard_bonus_feat']
    },
    spellcasting: {
      mode: 'prepared',
      ability: 'intelligence',
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
      spellList: wizardSpellList
    },
    setup: player => {
      Broadcast.sayAt(player, 'You take up the path of the Wizard.');
      player.setMeta('class', 'wizard');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Initialize prepared spells structure
      if (!player.getMeta('preparedSpells')) {
        player.setMeta('preparedSpells', {});
      }
    }
  };
};
