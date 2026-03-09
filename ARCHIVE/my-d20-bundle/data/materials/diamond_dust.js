// path: bundles/my-d20-bundle/data/materials/diamond_dust.js
'use strict';

/**
 * Material: Diamond Dust
 * Value: 4gp per pinch
 * 250 pinches = 1,000gp total value for Abjuration
 */
module.exports = {
  id: 'diamond_dust',
  name: 'Diamond Dust',
  baseType: 'reagent',
  typicalValues: [4], 
  metadata: {
    description: 'A fine, sparkling sediment of crushed diamonds, used to ground the highest-tier abjurations.',
    rarity: 'rare',
    weight: 0.01,   // Weight per pinch
    unitValue: 0.2, // 5 pinches = 1 capacity unit
    isStackable: true,
    maxStack: 1000,
    tags: ['reagent', 'abjuration_component', 'lapidary_byproduct']
  }
};
