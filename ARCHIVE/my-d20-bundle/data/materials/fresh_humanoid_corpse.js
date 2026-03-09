// path: bundles/my-d20-bundle/data/materials/fresh_humanoid_corpse.js
'use strict';

module.exports = {
  id: 'fresh_humanoid_corpse',
  name: 'Fresh Humanoid Corpse',
  baseType: 'reagent',
  metadata: {
    description: 'A body that still retains the warmth of life, or has not yet succumbed to the full rigor of death.',
    rarity: 'common', // Conceptually common in a MUD context
    weight: 150,
    tags: ['reagent', 'necromancy_component', 'heavy'],
    expirationTime: 86400000 // 24 hours in ms
  }
};
