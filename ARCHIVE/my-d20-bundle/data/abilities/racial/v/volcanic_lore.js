'use strict';

module.exports = {
  id: 'volcanic_lore',
  name: 'Volcanic Lore',
  category: 'racial',
  type: 'ability',

  tags: ['dwarf', 'knowledge', 'geology'],

  description: 'Magma dwarves possess deep knowledge of volcanic environments, magma flows, and geothermal hazards.',

  bonuses: {
    knowledgeGeology: 2,
    survivalVolcanic: 2
  },

  detection: {
    type: 'geothermal_instability',
    range: 20
  }
};
