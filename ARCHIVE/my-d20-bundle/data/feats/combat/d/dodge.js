
'use strict';

module.exports = {
  id: 'dodge',
  name: 'Dodge',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/dodge.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'dodge',
  name: 'Dodge',
  passive: true,
  tags: ['combat', 'general'],

  prerequisites: {
    baseAttackBonus: 0,
    abilityScores: { dex: 13 },
    skills: {},
    feats: [],
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
