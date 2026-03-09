// bundles/my-d20-bundle/data/classes/base/paladin.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const paladinSpellList = require('../../spelllists/paladin');

  return {
    id: 'paladin',
    name: 'Paladin',
    description: 'A holy warrior bound by oath, wielding divine power and martial skill.',
    hitDie: 10,

    classSkills: [
      'concentration',
      'craft',
      'diplomacy',
      'handle_animal',
      'heal',
      'knowledge_religion',
      'profession',
      'ride',
      'sense_motive'
    ],

    abilities: {
      1: ['aura_of_good', 'detect_evil', 'smite_evil_1'],
      2: ['divine_grace', 'lay_on_hands'],
      3: ['aura_of_courage', 'divine_health'],
      4: ['turn_undead', 'special_mount'],
      5: ['smite_evil_2'],
      6: ['remove_disease_1'],
      9: ['remove_disease_2'],
      12: ['remove_disease_3'],
      15: ['remove_disease_4'],
      18: ['remove_disease_5']
    },

    spellcasting: {
      mode: 'prepared',
      ability: 'wisdom',
      spellSlots: {
        1:  {},
        2:  {},
        3:  {},
        4:  { 1: 0 },
        5:  { 1: 1 },
        6:  { 1: 1 },
        7:  { 1: 1, 2: 0 },
        8:  { 1: 1, 2: 1 },
        9:  { 1: 1, 2: 1 },
        10: { 1: 1, 2: 1, 3: 0 },
        11: { 1: 1, 2: 1, 3: 1 },
        12: { 1: 1, 2: 1, 3: 1 },
        13: { 1: 1, 2: 1, 3: 1, 4: 0 },
        14: { 1: 1, 2: 1, 3: 1, 4: 1 },
        15: { 1: 1, 2: 1, 3: 1, 4: 1 },
        16: { 1: 2, 2: 1, 3: 1, 4: 1 },
        17: { 1: 2, 2: 2, 3: 1, 4: 1 },
        18: { 1: 2, 2: 2, 3: 2, 4: 1 },
        19: { 1: 2, 2: 2, 3: 2, 4: 2 },
        20: { 1: 3, 2: 2, 3: 2, 4: 2 }
      },
      spellList: paladinSpellList
    },

    setup: player => {
      Broadcast.sayAt(player, 'You swear the sacred oath of the Paladin.');
      player.setMeta('class', 'paladin');
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
