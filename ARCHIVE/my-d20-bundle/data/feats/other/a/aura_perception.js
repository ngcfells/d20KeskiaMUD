
'use strict';

module.exports = {
  id: 'aura_perception',
  name: 'Aura Perception',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder Occult Adventures (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Dreamscarred Press Psionics (3PP)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/aura_perception.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "aura_perception",
  name: "Aura Perception",
  description: "You perceive subtle spiritual or psychic energies, granting passive bonuses to sense motive and magical detection.",
  category: "magic",

  stanceEffects: {
    base: {
      skillBonus: {
        sense_motive: 2
      }
    },
    aggressive: {},
    defensive: {},
    perceptive: {
      skillBonus: {
        sense_motive: 3
      }
    }
  },

  hooks: {}
};
