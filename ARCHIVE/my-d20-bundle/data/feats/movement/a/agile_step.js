
'use strict';

module.exports = {
  id: 'agile_step',
  name: 'Agile Step',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Core Rulebook (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_step.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "agile_step",
  name: "Agile Step",
  description: "You move with exceptional precision, granting passive bonuses to avoid difficult terrain and reposition safely.",
  category: "general",

  stanceEffects: {
    base: {
      ignoreDifficultTerrain: true
    },
    aggressive: {},
    defensive: {
      dodgeBonus: 1
    },
    perceptive: {}
  },

  hooks: {}
};
