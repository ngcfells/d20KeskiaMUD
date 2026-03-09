
'use strict';

module.exports = {
  id: 'agile_wrestler',
  name: 'Agile Wrestler',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_wrestler.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "agile_wrestler",
  name: "Agile Wrestler",
  description: "You use agility to escape and control grapples, granting passive bonuses to escape artist and grapple checks.",
  category: "combat",

  stanceEffects: {
    base: {
      skillBonus: {
        escape_artist: 2
      }
    },
    aggressive: {
      grappleBonus: 1
    },
    defensive: {
      escapeBonus: 1
    },
    perceptive: {}
  },

  hooks: {}
};
