
'use strict';

module.exports = {
  id: 'exotic_weapon_proficiency',
  name: 'Exotic Weapon Proficiency',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/martial_weapon_proficiency.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'martial_weapon_proficiency',
  name: 'Martial Weapon Proficiency',
  passive: true,
  tags: ['combat', 'weapon'],

  prerequisites: {
    baseAttackBonus: 1
  },

  attributes: {},

  stance: {}
};
