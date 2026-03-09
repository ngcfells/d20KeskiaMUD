'use strict';

/**
 * Material Component: Vial of Unholy Water
 * Source: Standard / Dread Codex OGL
 */
module.exports = {
  id: 'vial_unholy_water',
  name: 'Vial of Unholy Water',
  baseType: 'reagent',
  typicalValues: [25.0], 
  metadata: {
    description: 'A glass vial containing water tainted by a dark ritual, used to bind spirits to severed flesh.',
    rarity: 'uncommon',
    weight: 0.5,
    unitValue: 25.0,
    isStackable: true,
    tags: ['reagent', 'necromancy_component', 'evil_reagent']
  }
};
