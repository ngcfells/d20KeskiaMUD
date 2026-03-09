
'use strict';

module.exports = {
  id: 'greater_spell_focus',
  name: 'Greater Spell Focus',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/greater_spell_focus.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'greater_spell_focus',
  name: 'Greater Spell Focus',
  passive: true,
  tags: ['magic', 'general'],

  prerequisites: {
    baseAttackBonus: 0,
    abilityScores: {},
    skills: {},
    feats: ['spell_focus'],
    classFeatures: [],
    race: null,
    alignment: null
  },

  modifiers: {},

  stance: {}
};
