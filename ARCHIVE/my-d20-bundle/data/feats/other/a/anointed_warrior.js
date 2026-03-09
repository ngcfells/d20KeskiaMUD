
'use strict';

module.exports = {
  id: 'anointed_warrior',
  name: 'Anointed Warrior',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Book of Exalted Deeds (Wizards of the Coast)
// Additional Sources: Pathfinder APG (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/anointed_warrior.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "anointed_warrior",
  name: "Anointed Warrior",
  description: "You are blessed with divine favor, granting passive bonuses to resisting evil and enhancing holy attacks.",
  category: "combat",

  stanceEffects: {
    base: {
      saveBonus: {
        will: 1
      }
    },
    aggressive: {
      damageBonusVsEvil: 1
    },
    defensive: {
      saveBonus: {
        will: 2
      }
    },
    perceptive: {}
  },

  hooks: {}
};
