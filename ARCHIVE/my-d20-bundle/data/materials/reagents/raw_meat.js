'use strict';

/**
 * Material Component: A piece of raw meat
 * Source: Standard
 */
module.exports = {
  id: 'raw_meat',
  name: 'Piece of Raw Meat',
  baseType: 'reagent',
  typicalValues: [0.1], 
  metadata: {
    description: 'A bloody, uncooked scrap of animal flesh used to trigger atavistic regression.',
    rarity: 'common',
    weight: 0.5,
    unitValue: 0.1,
    isStackable: true,
    maxStack: 10,
    tags: ['reagent', 'transmutation_component', 'primal_magic']
  }
};
