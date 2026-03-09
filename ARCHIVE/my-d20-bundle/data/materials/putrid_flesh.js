'use strict';

/**
 * Material Component: Putrid Flesh
 * Source: PHB / Dread Codex
 */
module.exports = {
  id: 'putrid_flesh',
  name: 'Scrap of Putrid Flesh',
  baseType: 'reagent',
  typicalValues: [0.05],
  metadata: {
    description: 'A foul-smelling, decaying piece of meat, crawling with bacteria.',
    rarity: 'common',
    weight: 0.1,
    unitValue: 0.05,
    isStackable: true,
    maxStack: 50,
    tags: ['reagent', 'necromancy_component', 'disease_component']
  }
};
