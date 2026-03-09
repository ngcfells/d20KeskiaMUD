
'use strict';

module.exports = {
  id: 'precise_shot',
  name: 'Precise Shot',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/precise_shot.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'precise_shot',
  name: 'Precise Shot',
  passive: true,
  tags: ['combat', 'ranged'],

  prerequisites: {
    baseAttackBonus: 0,
    abilityScores: {},
    skills: {},
    feats: ['point_blank_shot'],
    classFeatures: [],
    race: null,
    alignment: null
  },

  modifiers: {},

  stance: {}
};
