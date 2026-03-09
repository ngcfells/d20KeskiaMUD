
'use strict';

module.exports = {
  id: 'weapon_focus',
  name: 'Weapon Focus',
  category: 'combat',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player's Handbook, Wizards of the Coast

/**
BUNDLE: my-d20-bundle
PATH: bundles/my-d20-bundle/data/feats/w/weapon_focus.js
PURPOSE: Passive stance‑based feat definition.
*/

module.exports = {
  id: 'weapon_focus',
  name: 'Weapon Focus',
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
    attackBonus: +1
  },

  stance: {}
};
