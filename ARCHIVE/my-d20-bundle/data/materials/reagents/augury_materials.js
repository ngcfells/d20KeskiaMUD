'use strict';

/**
 * Material Component: Incense (25 gp)
 * Source: Standard
 */
const augury_incense = {
  id: 'incense',
  name: 'Rare Incense',
  baseType: 'reagent',
  typicalValues: [25.0],
  metadata: {
    description: 'A small bundle of aromatic resins used to cloud the mind and clear the vision.',
    rarity: 'uncommon',
    weight: 0.1,
    unitValue: 25.0,
    isStackable: true,
    tags: ['reagent', 'divination_component', 'ritual_incense']
  }
};

/**
 * Focus: Sticks, bones, or similar tokens
 * Source: Standard
 */
const augury_focus = {
  id: 'augury_focus',
  name: 'Divination Tokens',
  baseType: 'focus',
  typicalValues: [1.0],
  metadata: {
    description: 'A set of carved sticks, marked bones, or similar tokens used to interpret omens.',
    rarity: 'common',
    weight: 0.5,
    unitValue: 1.0,
    isStackable: false,
    tags: ['focus', 'divination_focus', 'cleric_component']
  }
};

module.exports = { augury_incense, augury_focus };
