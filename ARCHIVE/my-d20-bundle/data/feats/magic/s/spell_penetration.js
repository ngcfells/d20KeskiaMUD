
'use strict';

module.exports = {
  id: 'spell_penetration',
  name: 'Spell Penetration',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/spell_penetration.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'spell_penetration',
  name: 'Spell Penetration',
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

  modifiers: {},

  stance: {}
};
