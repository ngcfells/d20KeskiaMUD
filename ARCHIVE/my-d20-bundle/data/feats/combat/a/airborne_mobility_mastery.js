// Source: Pathfinder APG (Paizo)
// Additional Sources: Starfinder Core Rulebook (Paizo), Races of the Wild (Wizards of the Coast)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/airborne_mobility_mastery.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "airborne_mobility_mastery",
  name: "Airborne Mobility Mastery",
  category: "combat",
  type: "feat",
  description: "You maneuver with exceptional control while airborne, granting passive bonuses to avoid attacks and reposition safely.",

  stanceEffects: {
    base: {
      acVsOpportunityAttacks: 1
    },
    aggressive: {},
    defensive: {
      acVsOpportunityAttacks: 2
    },
    perceptive: {}
  },

  hooks: {}
};
