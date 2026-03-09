'use strict';

/**
 * Material Component: A pinch of snow or chip of ice
 * Source: Spell Compendium p. 16 (Arrow of Snow)
 */
module.exports = {
  id: 'snow_or_ice',
  name: 'Pinch of Snow/Ice',
  baseType: 'reagent',
  typicalValues: [0.0], // Environmental/Free
  metadata: {
    description: 'A freezing fragment of winter, preserved briefly for transmutation.',
    rarity: 'common',
    weight: 0.01,
    unitValue: 0.0,
    isStackable: true,
    maxStack: 10,
    tags: ['reagent', 'transmutation_component', 'cold_reagent']
  }
};
