// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Races of the Wild (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/airborne_archer.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "airborne_archer",
  name: "Airborne Archer",
  category: "combat",
  type: "feat",
  description: "You excel at archery while airborne, granting passive bonuses to aerial ranged attacks.",

  stanceEffects: {
    base: {
      attackBonusAerial: 1
    },
    aggressive: {
      attackBonusAerial: 2
    },
    defensive: {},
    perceptive: {}
  },

  hooks: {}
};
