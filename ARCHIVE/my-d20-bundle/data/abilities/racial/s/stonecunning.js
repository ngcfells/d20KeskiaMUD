'use strict';

module.exports = {
  id: 'stonecunning',
  name: 'Stonecunning',
  category: 'racial',
  type: 'ability',

  tags: ['dwarf', 'perception', 'engineering'],

  description: 'Dwarves possess an innate familiarity with stonework, granting exceptional ability to detect unusual stonework, hidden passages, and structural weaknesses.',

  bonuses: {
    perception: 2,
    engineering: 2
  },

  detection: {
    type: 'stonework_anomaly',
    range: 10
  }
};
