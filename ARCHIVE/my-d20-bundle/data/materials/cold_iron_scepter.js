// path: bundles/my-d20-bundle/data/materials/cold_iron_scepter.js
'use strict';

/**
 * Focus: Cold Iron Scepter
 * Source: AD&D 2E Tome of Magic (p. 50) | 3.5 Conversion
 * Usage: Required focus for high-level Abjuration magic.
 */
module.exports = {
  id: 'cold_iron_scepter',
  name: 'Cold Iron Scepter',
  baseType: 'focus',
  typicalValues: [500], 
  metadata: {
    description: 'A heavy, unadorned rod of forged cold iron. It feels unnaturally chilly and seems to draw the light from the air around it.',
    rarity: 'uncommon',
    weight: 5,
    cost: 500,
    tags: ['focus', 'abjuration_focus', 'anti_magic']
  }
};
