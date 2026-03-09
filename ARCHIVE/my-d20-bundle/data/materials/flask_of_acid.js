// path: bundles/my-d20-bundle/data/materials/flask_of_acid.js
'use strict';

/**
 * Material Component: Flask of Acid
 * Source: PHB p.128 / Spell Compendium p.7
 */
module.exports = {
  id: 'flask_of_acid',
  name: 'Flask of Acid',
  baseType: 'reagent',
  typicalValues: [10], 
  metadata: {
    description: 'A sealed glass flask filled with a highly corrosive, bubbling green liquid.',
    rarity: 'common',
    weight: 1,
    cost: 10,
    isStackable: false,
    tags: ['reagent', 'alchemy', 'acid', 'consumable']
  }
};
