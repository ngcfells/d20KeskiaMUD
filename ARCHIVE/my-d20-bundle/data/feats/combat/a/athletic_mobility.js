// Source: Advanced Player’s Manual (Green Ronin)
// Additional Sources: Quintessential Fighter (Mongoose Publishing), Pathfinder APG (Paizo)

/**
 * BUNDLE: feats
 * PATH: bundles/feats/a/athletic_mobility.js
 * PURPOSE: Passive stance‑based feat definition.
 */

module.exports = {
  id: "athletic_mobility",
  name: "Athletic Mobility",
  category: "combat",
  type: "feat",
  description: "Your athletic training improves your ability to move through threatened areas without provoking attacks.",

  stanceEffects: {
    base: {
      acVsOpportunityAttacks: 2
    },
    aggressive: {
      acVsOpportunityAttacks: 1
    },
    defensive: {
      acVsOpportunityAttacks: 3
    },
    perceptive: {}
  },

  hooks: {}
};
