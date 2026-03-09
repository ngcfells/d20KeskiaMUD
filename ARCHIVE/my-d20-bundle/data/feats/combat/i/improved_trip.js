
'use strict';

module.exports = {
  id: 'improved_trip',
  name: 'Improved Trip',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/improved_trip.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'improved_trip',
  name: 'Improved Trip',
  passive: true,
  tags: ['combat', 'general'],

  prerequisites: {
    baseAttackBonus: 0,
    abilityScores: { int: 13 },
    skills: {},
    feats: ['combat_expertise'],
    classFeatures: [],
    race: null,
    alignment: null
  },

  modifiers: {},

  stance: {}
};
