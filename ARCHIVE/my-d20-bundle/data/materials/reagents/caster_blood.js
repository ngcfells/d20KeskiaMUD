'use strict';

/**
 * Material Component: Caster's Blood (5 drops)
 * Source: Dread Codex | OGL (Greater Toughen Undead)
 */
module.exports = {
  id: 'caster_blood_drops',
  name: 'Caster\'s Blood',
  baseType: 'reagent',
  typicalValues: [0.0], 
  metadata: {
    description: 'Fresh blood drawn from the caster to bind a protective ward to the undead.',
    rarity: 'common',
    weight: 0.0,
    unitValue: 0.0,
    isStackable: true,
    maxStack: 100,
    tags: ['reagent', 'necromancy_component', 'blood_magic']
  }
};
