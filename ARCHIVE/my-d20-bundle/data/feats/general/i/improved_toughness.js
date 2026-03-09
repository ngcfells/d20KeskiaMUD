
'use strict';

module.exports = {
  id: 'improved_toughness',
  name: 'Improved Toughness',
  category: 'general',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/improved_toughness.js
// Source: Complete Warrior, Wizards of the Coast

module.exports = {
  id: 'improved_toughness',
  name: 'Improved Toughness',
  passive: true,
  tags: ['general'],

  prerequisites: {
    feats: ['toughness']
  },

  attributes: {
    health: +1 // per level, you can scale this in your HP formula
  },

  stance: {}
};
