// path: bundles/my-d20-bundle/data/materials/consecration_reagents.js
'use strict';

module.exports = [
  {
    id: 'powdered_silver',
    name: 'Powdered Silver',
    baseType: 'reagent',
    typicalValues: [10, 25, 50, 100], 
    metadata: {
      description: 'Finely ground silver dust, essential for abjurations and holy rites.',
      rarity: 'common',
      weight: 0.5,
      tags: ['reagent', 'holy_component', 'abjuration_component']
    }
  },
  {
    id: 'water_flask',
    name: 'Flask of Pure Water',
    baseType: 'reagent',
    metadata: {
      description: 'A sealed ceramic flask containing water from a mountain spring or blessed font.',
      rarity: 'common',
      weight: 1,
      tags: ['reagent', 'liquid', 'divine_focus']
    }
  }
];
