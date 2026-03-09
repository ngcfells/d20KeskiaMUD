
'use strict';

module.exports = {
  id: 'agile_skirmisher',
  name: 'Agile Skirmisher',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Quintessential Rogue (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_skirmisher.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "agile_skirmisher",
  name: "Agile Skirmisher",
  description: "You strike effectively while constantly on the move, granting passive bonuses to skirmish attacks and mobility.",
  category: "combat",

  stanceEffects: {
    base: {
      skirmishAttackBonus: 1
    },
    aggressive: {
      skirmishDamageBonus: 1
    },
    defensive: {
      dodgeBonus: 1
    },
    perceptive: {}
  },

  hooks: {}
};
