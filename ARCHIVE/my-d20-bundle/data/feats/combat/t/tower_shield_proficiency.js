
'use strict';

module.exports = {
  id: 'tower_shield_proficiency',
  name: 'Tower Shield Proficiency',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/tower_shield_proficiency.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'tower_shield_proficiency',
  name: 'Tower Shield Proficiency',
  passive: true,
  tags: ['combat', 'armor'],

  prerequisites: {
    feats: ['shield_proficiency']
  },

  attributes: {},

  stance: {}
};
