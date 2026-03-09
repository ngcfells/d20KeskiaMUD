'use strict';

module.exports = {
  id: 'duergar_lore',
  name: 'Duergar Lore',
  category: 'racial',
  type: 'ability',

  tags: ['dwarf', 'knowledge', 'underdark'],

  description: 'Duergar possess deep knowledge of subterranean hazards, planar bleed, and psionic anomalies.',

  bonuses: {
    knowledgeDungeoneering: 2,
    survivalUnderground: 2
  },

  detection: {
    type: 'planar_bleed',
    range: 20
  }
};
