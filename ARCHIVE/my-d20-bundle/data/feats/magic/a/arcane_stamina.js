
'use strict';

module.exports = {
  id: 'arcane_stamina',
  name: 'Arcane Stamina',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Arcana Evolved (Malhavoc Press), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_stamina.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_stamina",
  name: "Arcane Stamina",
  description: "Your magical endurance allows you to maintain spells and resist disruption, granting passive bonuses to concentration.",
  category: "magic",

  stanceEffects: {
    base: {
      skillBonus: {
        concentration: 2
      }
    },
    aggressive: {},
    defensive: {
      skillBonus: {
        concentration: 3
      }
    },
    perceptive: {}
  },

  hooks: {}
};
