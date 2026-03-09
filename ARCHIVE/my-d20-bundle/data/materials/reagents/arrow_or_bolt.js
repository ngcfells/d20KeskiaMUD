'use strict';

/**
 * Material Component: Wooden arrow or crossbow bolt
 * Source: Spell Compendium p. 16 (Arrow of Snow)
 */
module.exports = {
  id: 'arrow_or_bolt',
  name: 'Wooden Arrow/Bolt',
  baseType: 'reagent',
  typicalValues: [0.05], 
  metadata: {
    description: 'A standard wooden shaft tipped with iron, suitable for transmutation.',
    rarity: 'common',
    weight: 0.1,
    unitValue: 0.05,
    isStackable: true,
    maxStack: 20,
    tags: ['reagent', 'ammunition', 'wooden_projectile']
  }
};
