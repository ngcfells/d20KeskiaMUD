// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Races of the Wild (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/aerial_dodge.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "aerial_dodge",
  name: "Aerial Dodge",
  category: "combat",
  type: "feat",
  description: "You can evade attacks while airborne, granting passive bonuses to AC during flight.",

  stanceEffects: {
    base: {
      dodgeBonusAerial: 1
    },
    aggressive: {},
    defensive: {
      dodgeBonusAerial: 2
    },
    perceptive: {}
  },

  hooks: {}
};
