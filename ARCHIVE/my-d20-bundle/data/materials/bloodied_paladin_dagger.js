'use strict';

/**
 * Material Component: Bloodied Paladin Dagger
 * Source: Dread Codex (Dread Blade)
 * Requirement: Must have drawn blood from a Paladin.
 */
module.exports = {
  id: 'bloodied_paladin_dagger',
  name: 'Paladin-Bloodied Dagger',
  baseType: 'reagent',
  typicalValues: [500], // High value due to difficulty of acquisition
  metadata: {
    description: 'A wicked dagger with a rusted, jagged edge, stained with the dried ichor of a fallen champion of light.',
    rarity: 'rare',
    weight: 1,
    unitValue: 500,
    isStackable: false,
    tags: ['reagent', 'necromancy_component', 'evil_component', 'artifact_reagent']
  }
};
