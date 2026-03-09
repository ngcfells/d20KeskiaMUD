
'use strict';

module.exports = {
  id: 'aura_strengthening',
  name: 'Aura Strengthening',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Occult Adventures (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Dreamscarred Press Psionics (3PP)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/aura_strengthening.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "aura_strengthening",
  name: "Aura Strengthening",
  description: "You reinforce your spiritual or psychic aura, granting passive bonuses to resist magical and emotional influence.",
  category: "magic",

  stanceEffects: {
    base: {
      saveBonus: {
        will: 1
      }
    },
    aggressive: {},
    defensive: {
      saveBonus: {
        will: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};
