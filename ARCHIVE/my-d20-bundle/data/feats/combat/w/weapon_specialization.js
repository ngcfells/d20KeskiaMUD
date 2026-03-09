
'use strict';

module.exports = {
  id: 'weapon_specialization',
  name: 'Weapon Specialization',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/weapon_specialization.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'weapon_specialization',
  name: 'Weapon Specialization',
  passive: true,
  tags: ['combat', 'fighter'],

  prerequisites: {
    baseAttackBonus: 4,
    abilityScores: {},
    skills: {},
    feats: ['weapon_focus'],
    classFeatures: ['fighter_level_4'], // you can define this however you like
    race: null,
    alignment: null
  },

  modifiers: {
    damageBonus: +2
  },

  stance: {}
};
