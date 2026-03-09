
'use strict';

module.exports = {
  id: 'toughness',
  name: 'Toughness',
  category: 'general',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/toughness.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'toughness',
  name: 'Toughness',
  passive: true,
  tags: ['general'],

  prerequisites: {},

  attributes: {
    health: +3
  },

  stance: {}
};
