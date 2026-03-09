// bundles/my-d20-bundle/data/classes/base/ranger.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const rangerSpellList = require('../../spelllists/ranger');

  return {
    id: 'ranger',
    name: 'Ranger',
    description: 'A skilled hunter and tracker, adept with bow and blade.',
    hitDie: 8,
    classSkills: [
      'climb',
      'concentration',
      'craft',
      'handle_animal',
      'heal',
      'hide',
      'jump',
      'knowledge_dungeoneering',
      'knowledge_geography',
      'knowledge_nature',
      'listen',
      'move_silently',
      'profession',
      'ride',
      'search',
      'spot',
      'survival',
      'swim',
      'use_rope'
    ],
    abilities: {
      1: ['favored_enemy_1', 'track', 'wild_empathy'],
      2: ['combat_style'],
      3: ['endurance'],
      4: ['animal_companion'],
      7: ['woodland_stride'],
      8: ['swift_tracker'],
      9: ['evasion'],
      11: ['camouflage'],
      13: ['favored_enemy_2'],
      17: ['hide_in_plain_sight']
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
      spellList: rangerSpellList
    },
    setup: player => {
      Broadcast.sayAt(player, 'You walk the path of the Ranger.');
      player.setMeta('class', 'ranger');
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
