'use strict';

module.exports = {
  id: 'duergar_enlarge_psionic',
  name: 'Enlarge (Psionic)',
  category: 'racial',
  type: 'ability',

  tags: ['dwarf', 'duergar', 'psionic'],

  description: 'Psionic focus allows the duergar to increase their size and strength temporarily.',

  activation: {
    type: 'psionic',
    cost: 1,
    cooldown: 60
  },

  effects: {
    sizeIncrease: 1,
    strengthBonus: 2,
    damageBonus: 1
  },

  dispel: {
    type: 'psionic',
    difficulty: 12
  }
};
