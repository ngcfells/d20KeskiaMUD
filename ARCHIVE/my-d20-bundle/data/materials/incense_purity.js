'use strict';

/**
 * Material Component: Incense of Purity
 * Source: Used specifically for Banishment (Hezrou)
 * Logic: Cleanses the air of the hezrou's toxic, nauseating odor.
 */
module.exports = {
  id: 'incense_purity',
  name: 'Incense of Purity',
  baseType: 'reagent',
  typicalValues: [250], // Gold pieces per block
  metadata: {
    description: 'A rectangular block of pale, sweet-smelling resin flecked with silver leaf. When lit, it produces a thick, pearly-hued smoke that smells of mountain air and fresh snow.',
    rarity: 'rare',
    weight: 1.0,
    isStackable: true,
    maxStack: 5,
    tags: ['reagent', 'abjuration_component', 'anti_hezrou', 'cleansing'],
    researchLore: 'A Hezrou\'s essence is built upon filth and miasma. Burning Incense of Purity creates a localized planar vacuum that the demon cannot inhabit.'
  }
};
