
'use strict';

module.exports = {
  id: 'quickdraw',
  name: 'Quickdraw',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/quick_draw.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'quick_draw',
  name: 'Quick Draw',
  passive: true,
  tags: ['combat'],

  prerequisites: {
    baseAttackBonus: 1
  },

  attributes: {
    quickdraw: +1
  },

  stance: {}
};
