
'use strict';

module.exports = {
  id: 'improved_counterspell',
  name: 'Improved Counterspell',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/improved_counterspell.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'improved_counterspell',
  name: 'Improved Counterspell',
  passive: true,
  tags: ['magic', 'general'],

  prerequisites: {
    baseAttackBonus: 0,
    abilityScores: {},
    skills: {},
    feats: [],
    classFeatures: [],
    race: null,
    alignment: null
  },

  modifiers: {},

  stance: {}
};
