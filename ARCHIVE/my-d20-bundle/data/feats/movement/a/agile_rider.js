
'use strict';

module.exports = {
  id: 'agile_rider',
  name: 'Agile Rider',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Player’s Handbook (Wizards of the Coast)
// Additional Sources: Pathfinder Core Rulebook (Paizo), Quintessential Fighter (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_rider.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "agile_rider",
  name: "Agile Rider",
  description: "You ride with exceptional balance and control, granting passive bonuses to mounted combat maneuvers.",
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
