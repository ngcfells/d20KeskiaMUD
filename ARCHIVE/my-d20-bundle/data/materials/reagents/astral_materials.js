'use strict';

/**
 * Material Component: Jacinth (1,000 gp)
 * Source: PHB p. 202 (Astral Projection)
 */
const jacinth = {
  id: 'jacinth',
  name: 'Jacinth',
  baseType: 'reagent',
  typicalValues: [1000.0],
  metadata: {
    description: 'A precious, fiery orange-red zircon of exceptional clarity.',
    rarity: 'rare',
    weight: 0.1,
    unitValue: 1000.0,
    isStackable: true,
    tags: ['reagent', 'necromancy_component', 'high_value_gem']
  }
};

/**
 * Material Component: Silver Bar (5 gp)
 * Source: PHB p. 202 (Astral Projection)
 */
const silver_bar = {
  id: 'silver_bar',
  name: 'Ornate Silver Bar',
  baseType: 'reagent',
  typicalValues: [5.0],
  metadata: {
    description: 'A finely engraved bar of pure silver, used as a focal point for the silver cord.',
    rarity: 'uncommon',
    weight: 1.0,
    unitValue: 5.0,
    isStackable: true,
    tags: ['reagent', 'planar_magic', 'silver_cord_focus']
  }
};

module.exports = { jacinth, silver_bar };
