'use strict';

module.exports = {
  id: 'duergar_invisibility_psionic',
  name: 'Invisibility (Psionic)',
  category: 'racial',
  type: 'ability',

  tags: ['dwarf', 'duergar', 'psionic'],

  description: 'Psionic manipulation of perception renders the duergar invisible for a short duration.',

  activation: {
    type: 'psionic',
    cost: 1,
    cooldown: 60
  },

  effects: {
    invisible: true,
    duration: 30
  },

  dispel: {
    type: 'psionic',
    difficulty: 12
  }
};
