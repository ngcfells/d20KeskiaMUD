
'use strict';

module.exports = {
  id: 'arcane_resistance',
  name: 'Arcane Resistance',
  category: 'magic',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Complete Mage (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/arcane_resistance.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "arcane_resistance",
  name: "Arcane Resistance",
  description: "Your exposure to magic has hardened your body and mind, granting passive bonuses to resist spells and magical effects.",
  category: "magic",

  stanceEffects: {
    base: {
      saveBonus: {
        will: 1,
        fortitude: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        will: 2,
        fortitude: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};
