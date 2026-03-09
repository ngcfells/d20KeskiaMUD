
'use strict';

module.exports = {
  id: 'spell_focus',
  name: 'Spell Focus',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/spell_focus.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'spell_focus',
  name: 'Spell Focus',
  passive: true,
  tags: ['magic', 'general'],

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
    // you can interpret this as +1 DC to a chosen school
  },

  stance: {}
};
