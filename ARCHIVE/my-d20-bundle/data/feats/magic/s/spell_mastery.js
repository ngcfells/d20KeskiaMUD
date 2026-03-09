
'use strict';

module.exports = {
  id: 'spell_mastery',
  name: 'Spell Mastery',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/spell_mastery.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'spell_mastery',
  name: 'Spell Mastery',
  passive: true,
  tags: ['magic', 'wizard'],

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
