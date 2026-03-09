// path: bundles/my-d20-bundle/data/materials/fine_incense.js
'use strict';

module.exports = {
  id: 'fine_incense',
  name: 'Fine Incense',
  baseType: 'reagent',
  metadata: {
    description: 'Highly aromatic, expensive incense used for divinations.',
    rarity: 'uncommon',
    weight: 0.01,
    unitValue: 0.2, // 5 pinches = 1 unit
    isStackable: true,
    maxStack: 100,
    tags: ['reagent', 'divination_component', 'incense']
  }
};
