
'use strict';

module.exports = {
  id: 'agile',
  name: 'Agile',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile.js
 * PURPOSE: Passive stance-based feat definition with full prerequisites.
 */

module.exports = {
  id: "agile",
  name: "Agile",
  description: "You are particularly flexible and poised.",
  category: "general",
  prerequisites: { attributes: { dex: 13 } },
  stanceEffects: {
    base: { skillBonus: { balance: 2, escape_artist: 2 } },
    aggressive: { skillBonus: { balance: 2 } },
    defensive: { skillBonus: { escape_artist: 3 } },
    perceptive: {}
  },
  hooks: {}
};
