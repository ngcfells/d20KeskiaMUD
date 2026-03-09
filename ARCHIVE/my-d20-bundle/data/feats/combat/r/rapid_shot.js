
'use strict';

module.exports = {
  id: 'rapid_shot',
  name: 'Rapid Shot',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/rapid_shot.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'rapid_shot',
  name: 'Rapid Shot',
  passive: true,
  tags: ['combat', 'ranged'],

  prerequisites: {
    baseAttackBonus: 1,
    abilityScores: { dex: 13 },
    skills: {},
    feats: ['point_blank_shot'],
    classFeatures: [],
    race: null,
    alignment: null
  },

  modifiers: {},

  stance: {
    aggressive: {
      attackBonus: -1,
      damageBonus: 0
    }
  }
};
