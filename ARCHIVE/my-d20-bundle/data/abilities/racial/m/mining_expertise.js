'use strict';

module.exports = {
  id: 'mining_expertise',
  name: 'Mining Expertise',
  category: 'racial',
  type: 'ability',

  tags: ['dwarf', 'mining', 'crafting', 'engineering'],

  description: 'Dwarves are legendary miners, trained from youth in excavation, ore identification, and safe tunneling practices. They excel at detecting valuable veins, avoiding collapses, and working efficiently underground.',

  bonuses: {
    professionMiner: 4,
    perceptionUnderground: 2
  },

  excavation: {
    speedMultiplier: 1.25,        // 25% faster excavation
    collapseAvoidanceBonus: 2     // bonus to checks preventing cave-ins
  },

  detection: {
    type: 'ore_vein',
    range: 15                     // dwarves can sense ore density changes
  }
};
