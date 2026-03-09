
'use strict';

module.exports = {
  id: 'spring_attack',
  name: 'Spring Attack',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/spring_attack.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'spring_attack',
  name: 'Spring Attack',
  passive: true,
  tags: ['combat', 'general'],

  prerequisites: {
    baseAttackBonus: 4,
    abilityScores: { dex: 13 },
    skills: {},
    feats: ['dodge', 'mobility'],
    classFeatures: [],
    race: null,
    alignment: null
  },

  modifiers: {},

  stance: {}
};
