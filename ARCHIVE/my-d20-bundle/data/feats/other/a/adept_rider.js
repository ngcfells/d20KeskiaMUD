
'use strict';

module.exports = {
  id: 'adept_rider',
  name: 'Adept Rider',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo), Starfinder Alien Archive (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/adept_rider.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "adept_rider",
  name: "Adept Rider",
  description: "You are skilled at riding and controlling mounts, granting passive bonuses to mounted combat maneuvers.",
  category: "combat",

  stanceEffects: {
    base: {
      skillBonus: {
        ride: 2
      }
    },
    aggressive: {
      attackBonusMounted: 1
    },
    defensive: {
      dodgeBonusMounted: 1
    },
    perceptive: {}
  },

  hooks: {}
};
