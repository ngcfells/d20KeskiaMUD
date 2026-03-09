'use strict';

module.exports = {
  id: 'duergar_invisibility_innate',
  name: 'Invisibility (Innate Magic)',
  category: 'racial',
  type: 'ability',

  tags: ['dwarf', 'duergar', 'innate_magic'],

  description: 'Planar-infused magic allows the duergar to vanish from sight for a short duration.',

  activation: {
    type: 'innate_magic',
    cooldown: 60
  },

  effects: {
    invisible: true,
    duration: 30
  },

  dispel: {
    type: 'magic',
    difficulty: 10
  }
};
