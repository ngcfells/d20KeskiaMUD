// path: bundles/my-d20-bundle/data/materials/aqua_regia.js
'use strict';

/**
 * Material: Aqua Regia (Royal Water)
 * Source: Tome of Alchemy
 */
module.exports = {
  id: 'aqua_regia',
  name: 'Vial of Aqua Regia',
  baseType: 'reagent',
  typicalValues: [15], 
  metadata: {
    description: 'A highly corrosive mixture of nitric and hydrochloric acid, capable of dissolving even gold.',
    rarity: 'uncommon',
    weight: 0.1,
    cost: 15,
    tags: ['reagent', 'alchemy', 'acid']
  }
};
