'use strict';

/**
 * Material Component: Dragon Scale
 * Source: Draconomicon / Spell Compendium
 * Usage: Required for Antidragon Aura, Dragonskin, and various Draconic abjurations.
 */
module.exports = {
  id: 'dragon_scale',
  name: 'Dragon Scale',
  baseType: 'reagent',
  // Typical market value for a single usable spellcasting scale.
  // Values vary by dragon age; 50gp is a standard baseline for common colors.
  typicalValues: [50, 150, 500], 
  metadata: {
    description: 'A thick, shimmering plate of natural armor shed or harvested from a dragon.',
    rarity: 'rare',
    weight: 0.1,
    unitValue: 50,
    isStackable: true,
    maxStack: 100,
    tags: ['reagent', 'abjuration_focus', 'draconic_component', 'high_value']
  }
};
