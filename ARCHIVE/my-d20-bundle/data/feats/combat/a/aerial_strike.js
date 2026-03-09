// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Races of the Wild (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/aerial_strike.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "aerial_strike",
  name: "Aerial Strike",
  category: "combat",
  type: "feat",
  description: "You excel at attacking from above, granting passive bonuses to aerial melee and ranged attacks.",

  stanceEffects: {
    base: {
      attackBonusAerial: 1
    },
    aggressive: {
      damageBonusAerial: 1
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
