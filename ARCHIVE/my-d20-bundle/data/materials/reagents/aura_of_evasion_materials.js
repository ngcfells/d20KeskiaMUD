'use strict';

/**
 * Material Component: Powdered Emerald (500 gp)
 * Source: Standard / Spell Compendium p. 18
 */
module.exports = {
  id: 'powdered_emerald',
  name: 'Powdered Emerald',
  baseType: 'reagent',
  typicalValues: [500.0],
  metadata: {
    description: 'Finely ground emerald dust of high purity, used to anchor protective auras.',
    rarity: 'rare',
    weight: 0.1,
    unitValue: 500.0,
    isStackable: true,
    tags: ['reagent', 'abjuration_component', 'expensive_material']
  }
};
