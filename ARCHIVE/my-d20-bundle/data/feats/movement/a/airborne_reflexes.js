
'use strict';

module.exports = {
  id: 'airborne_reflexes',
  name: 'Airborne Reflexes',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Races of the Wild (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/airborne_reflexes.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "airborne_reflexes",
  name: "Airborne Reflexes",
  description: "Your reflexes remain sharp even in flight, granting passive bonuses to Reflex saves while airborne.",
  category: "combat",

  stanceEffects: {
    base: {
      saveBonus: {
        reflex: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        reflex: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};
