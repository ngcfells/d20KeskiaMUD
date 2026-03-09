
'use strict';

module.exports = {
  id: 'arcane_endurance',
  name: 'Arcane Endurance',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Complete Mage (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Arcana Evolved (Malhavoc Press)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_endurance.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_endurance",
  name: "Arcane Endurance",
  description: "Your magical training bolsters your stamina, granting passive bonuses to concentration and resistance.",
  category: "magic",

  stanceEffects: {
    base: {
      skillBonus: {
        concentration: 2
      },
      saveBonus: {
        fortitude: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        fortitude: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};
