
'use strict';

module.exports = {
  id: 'angelic_resistance',
  name: 'Angelic Resistance',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Dragon Magazine (Paizo/WotC)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/angelic_resistance.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "angelic_resistance",
  name: "Angelic Resistance",
  description: "Celestial resilience grants passive bonuses to resist negative energy and harmful magic.",
  category: "general",

  stanceEffects: {
    base: {
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
