
'use strict';

module.exports = {
  id: 'greater_spell_penetration',
  name: 'Greater Spell Penetration',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// bundles/classes/feats/greater_spell_penetration.js
// Source: Player's Handbook, Wizards of the Coast

module.exports = {
  id: 'greater_spell_penetration',
  name: 'Greater Spell Penetration',
  passive: true,
  tags: ['magic', 'general'],

  prerequisites: {
    baseAttackBonus: 0,
    abilityScores: {},
    skills: {},
    feats: ['spell_penetration'],
    classFeatures: [],
    race: null,
    alignment: null
  },

  modifiers: {},

  stance: {}
};
