'use strict';

/**
 * Material Component: 1 pound of iron
 * Source: Dread Codex | OGL (Enhance Skeletons)
 */
module.exports = {
  id: 'iron_ingot_1lb',
  name: 'One Pound Iron Ingot',
  baseType: 'reagent',
  typicalValues: [0.1], 
  metadata: {
    description: 'A solid, one-pound bar of raw iron used to reinforce the marrow of skeletal undead.',
    rarity: 'common',
    weight: 1.0,
    unitValue: 0.1,
    isStackable: true,
    maxStack: 50,
    tags: ['reagent', 'necromancy_component', 'metal']
  }
};
