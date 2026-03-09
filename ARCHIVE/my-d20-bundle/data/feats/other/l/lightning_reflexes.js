
'use strict';

module.exports = {
  id: 'lightning_reflexes',
  name: 'Lightning Reflexes',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/lightning_reflexes.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'lightning_reflexes',
  name: 'Lightning Reflexes',
  passive: true,
  tags: ['general'],

  prerequisites: {},

  attributes: {
    reflex: +2
  },

  stance: {}
};
