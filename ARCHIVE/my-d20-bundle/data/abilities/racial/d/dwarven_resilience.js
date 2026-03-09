'use strict';

module.exports = {
  id: 'dwarven_resilience',
  name: 'Dwarven Resilience',
  category: 'racial',
  type: 'ability',

  tags: ['dwarf', 'defense', 'resistance'],

  description: 'Dwarves are exceptionally hardy, gaining bonuses on saving throws against poison, spells, and magical effects.',

  bonuses: {
    savePoison: 2,
    saveMagic: 2
  }
};
