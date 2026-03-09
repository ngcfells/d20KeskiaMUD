
'use strict';

module.exports = {
  id: 'two_weapon_fighting',
  name: 'Two Weapon Fighting',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/two_weapon_fighting.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'two_weapon_fighting',
  name: 'Two-Weapon Fighting',
  passive: true,
  tags: ['combat'],

  prerequisites: {
    abilityScores: { dexterity: 15 }
  },

  attributes: {
    // You will apply off-hand penalty reduction in your combat engine
  },

  stance: {
    aggressive: {
      attackBonus: -1
    }
  }
};
