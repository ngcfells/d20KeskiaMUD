
'use strict';

module.exports = {
  id: 'medium_armor_proficiency',
  name: 'Medium Armor Proficiency',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/medium_armor_proficiency.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'medium_armor_proficiency',
  name: 'Medium Armor Proficiency',
  passive: true,
  tags: ['combat', 'armor'],

  prerequisites: {
    feats: ['light_armor_proficiency']
  },

  attributes: {},

  stance: {}
};
