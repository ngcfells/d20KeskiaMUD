// bundles/my-d20-bundle/data/classes/npc/warrior.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'warrior',
    name: 'Warrior',
    description: 'A trained soldier with basic martial skill.',
    hitDie: 8,

    classSkills: [
      'climb',
      'craft',
      'handle_animal',
      'intimidate',
      'jump',
      'ride',
      'swim'
    ],

    abilities: {
      1: [
        'simple_weapon_proficiency',
        'martial_weapon_proficiency',
        'armor_proficiency_light',
        'armor_proficiency_medium',
        'shield_proficiency'
      ]
    },

    setup: player => {
      Broadcast.sayAt(player, 'You take up arms as a Warrior.');
      player.setMeta('class', 'warrior');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });
    }
  };
};
