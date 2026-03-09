// bundles/my-d20-bundle/lib/classes/barbarian.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'barbarian',
    name: 'Barbarian',
    description: 'A fierce warrior of primitive background who can enter a battle rage.',
    hitDie: 12,
    classSkills: [
      'climb',
      'craft',
      'handle_animal',
      'intimidate',
      'jump',
      'listen',
      'ride',
      'survival',
      'swim'
    ],
    abilities: {
      1: ['rage_1', 'fast_movement', 'illiteracy'],
      2: ['uncanny_dodge'],
      3: ['trap_sense_1'],
      5: ['improved_uncanny_dodge'],
      6: ['trap_sense_2'],
      7: ['damage_reduction_1'],
      9: ['trap_sense_3'],
      10: ['damage_reduction_2'],
      12: ['trap_sense_4'],
      13: ['damage_reduction_3'],
      15: ['trap_sense_5'],
      16: ['damage_reduction_4'],
      18: ['trap_sense_6'],
      19: ['damage_reduction_5'],
      20: ['mighty_rage']
    },
    setup: player => {
      Broadcast.sayAt(player, 'You embrace the path of the Barbarian.');
      player.setMeta('class', 'barbarian');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });
    }
  };
};
