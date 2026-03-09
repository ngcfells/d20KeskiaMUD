// path: bundles/my-d20-bundle/data/materials/brimstone_sulfur.js
'use strict';

module.exports = {
  id: 'brimstone_sulfur',
  name: 'Pinch of Brimstone Sulfur',
  baseType: 'reagent',
  metadata: {
    description: 'A yellow, foul-smelling crystalline powder harvested from volcanic vents.',
    rarity: 'uncommon',
    weight: 0.01,
    unitValue: 0.2, // 5 pinches = 1 capacity unit
    isStackable: true,
    maxStack: 100,
    cost: 1,
    tags: ['reagent', 'alchemy', 'fire', 'acid']
  }
};
