'use strict';

module.exports = {
  // --- LOW VALUE / ORNAMENTAL (10gp - 25gp) ---
  agate: {
    id: 'agate_stone',
    name: 'Agate',
    baseType: 'gem',
    typicalValues: [10, 25, 50],
    metadata: {
      description: 'A banded, translucent stone often used for protective talismans.',
      tags: ['reagent', 'focus', 'transmutation_focus', 'low_value']
    }
  },
  quartz: {
    id: 'quartz_crystal',
    name: 'Quartz',
    baseType: 'gem',
    typicalValues: [5, 10, 25],
    metadata: { description: 'A clear or smoky crystal shard.', tags: ['reagent', 'divination_focus'] }
  },
  obsidian: {
    id: 'obsidian_shard',
    name: 'Obsidian',
    baseType: 'gem',
    typicalValues: [10, 25],
    metadata: { description: 'A volcanic glass with razor-sharp edges.', tags: ['reagent', 'necromancy_component'] }
  },

  // --- SEMI-PRECIOUS (50gp - 100gp) ---
  bloodstone: {
    id: 'bloodstone',
    name: 'Bloodstone',
    baseType: 'gem',
    typicalValues: [50, 75, 100],
    metadata: {
      description: 'Dark green chalcedony with flecks of red jasper.',
      tags: ['reagent', 'necromancy_component', 'healing_focus']
    }
  },
  onyx: {
    id: 'black_onyx',
    name: 'Black Onyx',
    baseType: 'gem',
    typicalValues: [25, 50, 100, 500],
    metadata: { 
      description: 'A glossy, ink-black stone that anchors negative energy.',
      tags: ['reagent', 'necromancy_component', 'soul_anchor'] 
    }
  },
  moonstone: {
    id: 'moonstone',
    name: 'Moonstone',
    baseType: 'gem',
    typicalValues: [50, 100, 250],
    metadata: { description: 'A pale stone with an ethereal blue sheen.', tags: ['reagent', 'illusion_focus'] }
  },
  chrysoberyl: {
    id: 'chrysoberyl',
    name: 'Chrysoberyl',
    baseType: 'gem',
    typicalValues: [100, 250, 500, 1000],
    metadata: { 
      description: 'A translucent yellowish-green gem, prized for its ability to steady the mind.',
      tags: ['reagent', 'abjuration_focus', 'teleportation_anchor'] 
    }
  },

  // --- PRECIOUS (500gp - 1,000gp) ---
  pearl: {
    id: 'pearl',
    name: 'Pearl',
    baseType: 'gem',
    typicalValues: [10, 100, 500, 1000],
    metadata: { description: 'A lustrous sea-born gem.', tags: ['reagent', 'divination_focus', 'high_value'] }
  },
  sapphire: {
    id: 'sapphire',
    name: 'Sapphire',
    baseType: 'gem',
    typicalValues: [500, 1000, 5000],
    metadata: { description: 'A brilliant blue gem representing the sky or deep water.', tags: ['reagent', 'conjuration_focus'] }
  },
  ruby: {
    id: 'ruby',
    name: 'Ruby',
    baseType: 'gem',
    typicalValues: [500, 1000, 5000],
    metadata: { description: 'A crimson gem pulsing with inner fire.', tags: ['reagent', 'fire_component', 'evocation_focus'] }
  },

  // --- JEWELS / TREASURE (5,000gp+) ---
  diamond: {
    id: 'diamond',
    name: 'Diamond',
    baseType: 'gem',
    typicalValues: [500, 1000, 5000, 10000, 25000],
    metadata: { 
      description: 'The hardest known substance, reflecting prismatic light.',
      tags: ['reagent', 'resurrection_component', 'abjuration_focus', 'teleportation_anchor'] 
    }
  },
  yellow_diamond: {
    id: 'yellow_diamond',
    name: 'Yellow Diamond',
    baseType: 'gem',
    typicalValues: [500, 1000, 5000],
    metadata: {
      description: 'A rare canary-hued diamond that hums with planar stability.',
      tags: ['reagent', 'abjuration_focus', 'teleportation_anchor', 'rare_gem']
    }
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald',
    baseType: 'gem',
    typicalValues: [1000, 5000],
    metadata: { description: 'A deep green stone of immense clarity.', tags: ['nature_focus'] }
  },

  /**
   * Helper function to find a gem by criteria
   */
  isValidFocus(gemItem, minVal, requiredTag) {
    const value = gemItem.getMeta('cost') || 0;
    const tags = gemItem.getMeta('tags') || [];
    return value >= minVal && tags.includes(requiredTag);
  }
};
