'use strict';

/**
 * Material Components: Skull Bone & Live Maggot
 * Source: Dread Codex | OGL (Instill Foolishness)
 */
const skull_fragment = {
  id: 'skull_bone_fragment',
  name: 'Skull Bone Fragment',
  baseType: 'reagent',
  typicalValues: [0.5],
  metadata: {
    description: 'A jagged shard of bone taken from a dead man\'s cranium.',
    rarity: 'common',
    weight: 0.1,
    unitValue: 0.5,
    isStackable: true,
    tags: ['reagent', 'necromancy_component', 'skull_bone']
  }
};

const live_maggot = {
  id: 'live_maggot',
  name: 'Live Maggot',
  baseType: 'reagent',
  typicalValues: [0.0],
  metadata: {
    description: 'A pale, writhing larva, symbolizing the decay of thought.',
    rarity: 'common',
    weight: 0.0,
    unitValue: 0.0,
    isStackable: true,
    tags: ['reagent', 'necromancy_component', 'vermin']
  }
};

module.exports = { skull_fragment, live_maggot };
