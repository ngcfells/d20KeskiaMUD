
'use strict';

module.exports = {
  id: 'agile_riposte',
  name: 'Agile Riposte',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Star Wars Saga Edition (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Quintessential Rogue (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_riposte.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "agile_riposte",
  name: "Agile Riposte",
  description: "Your agility allows you to exploit openings in an opponent’s defense, granting passive bonuses to counterattacks.",
  category: "combat",

  stanceEffects: {
    base: {
      counterAttackBonus: 1
    },
    aggressive: {
      counterAttackBonus: 2
    },
    defensive: {
      dodgeBonus: 1
    },
    perceptive: {}
  },

  hooks: {}
};
