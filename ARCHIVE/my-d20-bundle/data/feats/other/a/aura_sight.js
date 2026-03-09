
'use strict';

module.exports = {
  id: 'aura_sight',
  name: 'Aura Sight',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Expanded Psionics Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Occult Adventures (Paizo), Starfinder Core Rulebook (Paizo), Dreamscarred Press Psionics (3PP)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/aura_sight.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "aura_sight",
  name: "Aura Sight",
  description: "You perceive subtle energies and emotional auras, granting passive bonuses to sense motive and magical detection.",
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
