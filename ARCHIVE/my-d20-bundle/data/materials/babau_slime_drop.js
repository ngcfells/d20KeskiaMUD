'use strict';

/**
 * Material Component: Babau Slime
 * Source: Spell Compendium p.22
 */
module.exports = {
  id: 'babau_slime_drop',
  name: 'Drop of Babau Slime',
  baseType: 'reagent',
  typicalValues: [10], // gp value; relatively rare given the source
  metadata: {
    description: 'A single, viscous droplet of caustic green ichor harvested from a Babau demon.',
    rarity: 'rare',
    weight: 0.1,
    tags: ['reagent', 'transmutation_component', 'acidic', 'fiendish']
  }
};
