'use strict';

/**
 * Material Component: Quicksilver Vial
 * Source: Dread Codex / PHB
 */
module.exports = {
  id: 'quicksilver_vial',
  name: 'Vial of Quicksilver',
  baseType: 'reagent',
  typicalValues: [50], // Mercury is expensive and hazardous
  metadata: {
    description: 'A small, sealed glass vial containing shimmering, liquid mercury.',
    rarity: 'uncommon',
    weight: 0.2,
    unitValue: 50,
    isStackable: true,
    maxStack: 10,
    tags: ['reagent', 'necromancy_component', 'transmutation_reagent', 'hazardous']
  }
};
