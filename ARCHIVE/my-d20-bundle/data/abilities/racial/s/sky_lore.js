'use strict';

module.exports = {
  id: 'sky_lore',
  name: 'Sky Lore',
  category: 'racial',
  type: 'ability',

  tags: ['dwarf', 'knowledge', 'weather', 'survival'],

  description: 'Sky dwarves possess deep knowledge of high-altitude environments, storm patterns, and wind behavior, granting them superior insight into mountain weather and cliffside hazards.',

  bonuses: {
    knowledgeWeather: 2,
    survivalHighAltitude: 2
  },

  detection: {
    type: 'storm_shift',
    range: 20
  }
};
