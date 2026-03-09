
'use strict';

module.exports = {
  id: 'improved_grapple',
  name: 'Improved Grapple',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/improved_grapple.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'improved_grapple',
  name: 'Improved Grapple',
  passive: true,
  tags: ['combat', 'general'],

  prerequisites: {
    baseAttackBonus: 0,
    abilityScores: { dex: 13 },
    skills: {},
    feats: ['improved_unarmed_strike'],
    classFeatures: [],
    race: null,
    alignment: null
  },

  modifiers: {},

  stance: {}
};
