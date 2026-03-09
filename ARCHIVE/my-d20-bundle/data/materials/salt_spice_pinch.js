'use strict';

/**
 * Material Component: A pinch of salt or spice
 * Source: Rite Publishing | 101 0-Level Spells p. 4 (Alter Taste)
 */
module.exports = {
  id: 'salt_spice_pinch',
  name: 'Pinch of Salt or Spice',
  baseType: 'reagent',
  typicalValues: [0.01], // Negligible cost for cantrip components
  metadata: {
    description: 'A small, carefully measured pinch of common salt or aromatic spice used to ground culinary illusions.',
    rarity: 'common',
    weight: 0.01,
    unitValue: 0.01,
    isStackable: true,
    maxStack: 100,
    tags: ['reagent', 'illusion_component', 'culinary_magic']
  }
};
