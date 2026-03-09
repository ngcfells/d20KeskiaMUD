
'use strict';

module.exports = {
  id: 'alien_physiology_adaptation',
  name: 'Alien Physiology Adaptation',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Starfinder Core Rulebook (Paizo)
// Additional Sources: d20 Future (Wizards of the Coast), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/alien_physiology_adaptation.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "alien_physiology_adaptation",
  name: "Alien Physiology Adaptation",
  description: "Your body has adapted to unusual environments or alien conditions, granting passive bonuses to resist hazards.",
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
