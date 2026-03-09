'use strict';

/**
 * Material Component: Bat Fur
 * Source: PHB p.200 (Arcane Eye / Darkvision)
 */
module.exports = {
  id: 'bat_fur',
  name: 'Tuft of Bat Fur',
  baseType: 'reagent',
  typicalValues: [0.01],
  metadata: {
    description: 'A small, soft clump of dark brown or black fur harvested from a bat.',
    rarity: 'common',
    weight: 0.01,
    unitValue: 0.01,
    isStackable: true,
    maxStack: 500,
    tags: ['reagent', 'divination_component', 'low_value']
  }
};
