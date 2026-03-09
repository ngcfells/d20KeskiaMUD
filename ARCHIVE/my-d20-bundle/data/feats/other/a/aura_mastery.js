
'use strict';

module.exports = {
  id: 'aura_mastery',
  name: 'Aura Mastery',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Occult Adventures (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Dreamscarred Press Psionics (3PP)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/aura_mastery.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "aura_mastery",
  name: "Aura Mastery",
  description: "You have refined control over your spiritual or psychic aura, granting passive bonuses to sensing and resisting energies.",
  category: "magic",

  stanceEffects: {
    base: {
      detectMagicBonus: 1,
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
    perceptive: {
      detectMagicBonus: 2
    }
  },

  hooks: {}
};
