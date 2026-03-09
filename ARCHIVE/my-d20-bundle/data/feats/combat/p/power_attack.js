
'use strict';

module.exports = {
  id: 'power_attack',
  name: 'Power Attack',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/power_attack.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'power_attack',
  name: 'Power Attack',
  passive: true,
  tags: ['combat', 'general'],

  prerequisites: {
    baseAttackBonus: 1,
    abilityScores: {},
    skills: {},
    feats: [],
    classFeatures: [],
    race: null,
    alignment: null
  },

  modifiers: {
    attackBonus: -1,
    damageBonus: +2
  },

  stance: {
    aggressive: {
      damageBonus: +3
    }
  }
};
