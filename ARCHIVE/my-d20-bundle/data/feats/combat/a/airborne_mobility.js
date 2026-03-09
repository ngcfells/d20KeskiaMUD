// Source: Starfinder Core Rulebook (Paizo)
// Additional Sources: Pathfinder APG (Paizo), Advanced Player’s Manual (Green Ronin)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/airborne_mobility.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "airborne_mobility",
  name: "Airborne Mobility",
  category: "combat",
  type: "feat",
  description: "You maneuver easily while airborne, granting passive bonuses to avoid attacks during flight.",

  stanceEffects: {
    base: {
      acVsOpportunityAttacks: 2
    },
    aggressive: {},
    defensive: {
      acVsOpportunityAttacks: 3
    },
    perceptive: {}
  },

  hooks: {}
};
