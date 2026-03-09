'use strict';

module.exports = {
  id: 'deep_lore',
  name: 'Deep Lore',
  category: 'racial',
  type: 'ability',

  tags: ['dwarf', 'knowledge', 'underground'],

  description: 'Deep dwarves possess extensive knowledge of subterranean hazards, cavern ecology, and deep-earth navigation.',

  bonuses: {
    knowledgeDungeoneering: 2,
    survivalUnderground: 2
  },

  detection: {
    type: 'tremor_shift',
    range: 20
  }
};
