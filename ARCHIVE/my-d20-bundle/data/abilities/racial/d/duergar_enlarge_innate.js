'use strict';

module.exports = {
  id: 'duergar_enlarge_innate',
  name: 'Enlarge (Innate Magic)',
  category: 'racial',
  type: 'ability',

  tags: ['dwarf', 'duergar', 'innate_magic'],

  description: 'Innate planar magic allows the duergar to increase their size and strength temporarily.',

  activation: {
    type: 'innate_magic',
    cooldown: 60
  },

  effects: {
    sizeIncrease: 1,
    strengthBonus: 2,
    damageBonus: 1
  },

  dispel: {
    type: 'magic',
    difficulty: 10
  }
};
