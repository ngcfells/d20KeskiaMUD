// path: bundles/my-d20-bundle/data/materials/sacred_acorn.js
'use strict';
module.exports = {
  id: 'sacred_acorn',
  name: 'Sacred Acorn',
  baseType: 'focus',
  metadata: {
    description: 'An acorn imbued with druidic essence. It feels unnaturally heavy and warm.',
    rarity: 'uncommon',
    weight: 0.1,
    cost: 50,
    tags: ['focus', 'nature_focus', 'imbued'],
    // This item provides a passive buff while held
    behaviors: {
      item_stats: {
        resolve: 1
      }
    }
  }
};
