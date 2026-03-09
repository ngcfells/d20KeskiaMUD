
'use strict';

module.exports = {
  id: 'mobility',
  name: 'Mobility',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/mobility.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'mobility',
  name: 'Mobility',
  passive: true,
  tags: ['combat', 'general'],

  prerequisites: {
    baseAttackBonus: 0,
    abilityScores: { dex: 13 },
    skills: {},
    feats: ['dodge'],
    classFeatures: [],
    race: null,
    alignment: null
  },

  modifiers: {
    defenseBonus: +1
  },

  stance: {
    defensive: {
      defenseBonus: +2
    }
  }
};
