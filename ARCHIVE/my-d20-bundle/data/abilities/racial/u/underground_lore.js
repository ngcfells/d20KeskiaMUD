'use strict';

module.exports = {
  id: 'underground_lore',
  name: 'Underground Lore',
  category: 'racial',
  type: 'ability',

  tags: ['dwarf', 'knowledge'],

  description: 'Dwarves possess deep knowledge of underground environments, gaining bonuses to knowledge checks related to caverns, stonework, and subterranean hazards.',

  bonuses: {
    knowledgeDungeoneering: 2,
    survivalUnderground: 2
  }
};
