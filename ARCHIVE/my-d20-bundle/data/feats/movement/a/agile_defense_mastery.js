
'use strict';

module.exports = {
  id: 'agile_defense_mastery',
  name: 'Agile Defense Mastery',
  category: 'movement',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Quintessential Rogue (Mongoose Publishing)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/agile_defense_mastery.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "agile_defense_mastery",
  name: "Agile Defense Mastery",
  description: "Your agility provides exceptional defensive capability, granting passive bonuses to dodge and evasion.",
  category: "combat",

  stanceEffects: {
    base: {
      dodgeBonus: 1
    },
    aggressive: {},
    defensive: {
      dodgeBonus: 2
    },
    perceptive: {}
  },

  hooks: {}
};
