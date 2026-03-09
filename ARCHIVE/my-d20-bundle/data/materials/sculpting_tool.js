'use strict';

/**
 * Material Component: Sculpting Tool
 * Source: Frostburn / General d20
 * Usage: Required focus for 'Animate Snow' and various transmutation/shaping spells.
 */
module.exports = {
  id: 'sculpting_tool',
  name: 'Sculpting Tool',
  baseType: 'tool',
  typicalValues: [5], // 5 gp for a quality artisan tool
  metadata: {
    description: 'A small, sharp carving knife or hooked metal tool used for fine detailing in wood, ice, or stone.',
    rarity: 'common',
    weight: 0.5,
    unitValue: 5,
    isStackable: false,
    tags: ['tool', 'focus', 'artisan_tool', 'transmutation_focus']
  }
};
