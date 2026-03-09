
'use strict';

module.exports = {
  id: 'athletic_sprint',
  name: 'Athletic Sprint',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Advanced Player’s Guide (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Quintessential Rogue (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/athletic_sprint.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "athletic_sprint",
  name: "Athletic Sprint",
  description: "You are trained for rapid bursts of speed, granting passive bonuses to sprinting and repositioning.",
  category: "general",

  stanceEffects: {
    base: {
      speedBonus: 5
    },
    aggressive: {
      speedBonus: 10
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
