'use strict';

/**
 * Material Component: Dust
 * Source: PHB p.196
 * Usage: Common reagent for Conjuration (Creation) spells.
 */
module.exports = {
  id: 'dust',
  name: 'Pinch of Dust',
  baseType: 'reagent',
  typicalValues: [0.01], 
  metadata: {
    description: 'A fine, grey sediment used to seed arcane vapors.',
    rarity: 'common',
    weight: 0.01,
    unitValue: 0.2, // 5 units = 1 capacity slot
    isStackable: true,
    maxStack: 500,
    tags: ['reagent', 'conjuration_focus', 'low_value']
  }
};
