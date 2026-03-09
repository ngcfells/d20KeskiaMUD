
'use strict';

module.exports = {
  id: 'diehard',
  name: 'Diehard',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/diehard.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'diehard',
  name: 'Diehard',
  passive: true,
  tags: ['general'],

  prerequisites: {
    feats: ['endurance']
  },

  attributes: {
    resolve: +2
  },

  stance: {}
};
