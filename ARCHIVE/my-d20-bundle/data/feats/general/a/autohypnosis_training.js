
'use strict';

module.exports = {
  id: 'autohypnosis_training',
  name: 'Autohypnosis Training',
  category: 'general',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Expanded Psionics Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Occult Adventures (Paizo), Starfinder Core Rulebook (Paizo), Dreamscarred Press Psionics (3PP)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/autohypnosis_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "autohypnosis_training",
  name: "Autohypnosis Training",
  description: "You have trained your mind to resist fear, pain, and distraction, granting passive bonuses to mental resilience.",
  category: "psionic",

  stanceEffects: {
    base: {
      skillBonus: {
        autohypnosis: 2
      },
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
