'use strict';

/**
 * Material Component: Copper Coil
 * Source: Modern d20 / Technomancy
 */
module.exports = {
  id: 'copper_coil',
  name: 'Copper Coil',
  baseType: 'reagent',
  typicalValues: [5], // 5gp for high-purity copper
  metadata: {
    description: 'A small spool of high-purity copper wire, essential for conducting or dampening energy.',
    rarity: 'common',
    weight: 0.1,
    unitValue: 5,
    isStackable: true,
    maxStack: 50,
    tags: ['reagent', 'abjuration_component', 'technomancy_reagent']
  }
};
