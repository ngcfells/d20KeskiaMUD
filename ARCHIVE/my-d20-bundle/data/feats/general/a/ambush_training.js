
'use strict';

module.exports = {
  id: 'ambush_training',
  name: 'Ambush Training',
  category: 'general',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Complete Scoundrel (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Starfinder Core Rulebook (Paizo), Quintessential Rogue (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/ambush_training.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "ambush_training",
  name: "Ambush Training",
  description: "You excel at striking from concealment, granting passive bonuses to stealth and surprise attacks.",
  category: "combat",

  stanceEffects: {
    base: {
      skillBonus: {
        hide: 2,
        move_silently: 2
      }
    },
    aggressive: {
      sneakAttackBonus: 1
    },
    defensive: {},
    perceptive: {
      skillBonus: {
        hide: 3,
        move_silently: 3
      }
    }
  },

  hooks: {}
};
