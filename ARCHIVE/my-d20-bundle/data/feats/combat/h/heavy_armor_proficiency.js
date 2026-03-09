
'use strict';

module.exports = {
  id: 'heavy_armor_proficiency',
  name: 'Heavy Armor Proficiency',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/heavy_armor_proficiency.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'heavy_armor_proficiency',
  name: 'Heavy Armor Proficiency',
  passive: true,
  tags: ['combat', 'armor'],

  prerequisites: {
    feats: ['medium_armor_proficiency']
  },

  attributes: {},

  stance: {}
};
