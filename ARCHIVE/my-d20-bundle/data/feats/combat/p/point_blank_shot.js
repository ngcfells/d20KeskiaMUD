
'use strict';

module.exports = {
  id: 'point_blank_shot',
  name: 'Point Blank Shot',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/point_blank_shot.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'point_blank_shot',
  name: 'Point Blank Shot',
  passive: true,
  tags: ['combat', 'ranged'],

  prerequisites: {
    baseAttackBonus: 0,
    abilityScores: {},
    skills: {},
    feats: [],
    classFeatures: [],
    race: null,
    alignment: null
  },

  modifiers: {
    attackBonus: +1,
    damageBonus: +1
  },

  stance: {}
};
