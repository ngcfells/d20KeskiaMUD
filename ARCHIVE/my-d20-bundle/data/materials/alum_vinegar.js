'use strict';

/**
 * Material Component: Alum soaked in vinegar
 * Source: PHB p.200 (Antipathy)
 */
module.exports = {
  id: 'alum_soaked_vinegar',
  name: 'Vinegar-Soaked Alum',
  baseType: 'reagent',
  typicalValues: [1.0], // Specialized reagent cost
  metadata: {
    description: 'A pungent, astringent mineral lump that has been cured in sharp vinegar.',
    rarity: 'uncommon',
    weight: 0.1,
    unitValue: 1.0,
    isStackable: true,
    maxStack: 20,
    tags: ['reagent', 'enchantment_component', 'antipathy_reagent']
  }
};
